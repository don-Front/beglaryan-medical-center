"""
Данные главной страницы из таблицы information_about_page (page_name = 'HomePage').
Формат content: сегменты вида |код| текст; для фото: |-| путь/к/файлу.jpg
"""
import re

from django.conf import settings
from django.db import DatabaseError, connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

PAGE_NAME_HOME = "HomePage"

# Сегменты: |ключ| значение до следующего |ключ| или конца строки
_CONTENT_SEGMENT_RE = re.compile(
    r"\|([^|]+)\|\s*(.*?)(?=\|[^|]+\||\Z)",
    re.DOTALL,
)
# Для сортировки: Photo-1, Line-2 → число и префикс
_BLOCK_TYPE_ORDER_RE = re.compile(r"^(.+)-(\d+)$")


def _block_type_sort_key(block_type: str) -> tuple:
    if not block_type:
        return (10**9, "", block_type)
    m = _BLOCK_TYPE_ORDER_RE.match(block_type.strip())
    if m:
        prefix, num_s = m.group(1), m.group(2)
        return (int(num_s), prefix, block_type)
    return (10**9, block_type, block_type)


def parse_information_content(raw) -> dict:
    """
    Разбирает content.
    - Фото: сегмент |-| путь → kind 'photo', одна общая ссылка для всех языков.
    - Текст: сегменты |код| текст по порядку в строке → kind 'texts', словарь и порядок языков.
    """
    if raw is None:
        return {"kind": "empty", "languages": None, "language_order": [], "photo": None}

    s = str(raw).strip()
    if not s:
        return {"kind": "empty", "languages": None, "language_order": [], "photo": None}

    segments = []
    for m in _CONTENT_SEGMENT_RE.finditer(s):
        key = m.group(1).strip()
        val = m.group(2).strip()
        segments.append((key, val))

    if not segments:
        return {"kind": "raw", "languages": None, "language_order": [], "photo": None, "raw": s}

    for key, val in segments:
        if key == "-":
            return {
                "kind": "photo",
                "languages": None,
                "language_order": [],
                "photo": val,
            }

    ordered = [(k, v) for k, v in segments if k != "-"]
    languages = {k: v for k, v in ordered}
    language_order = [k for k, _ in ordered]
    return {
        "kind": "texts",
        "languages": languages,
        "language_order": language_order,
        "photo": None,
    }


def fetch_home_page_rows() -> list[dict]:
    """
    page_key, block_type, content для HomePage; сортировка по числу в block_type.
    """
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT page_key, block_type, content
            FROM information_about_page
            WHERE page_name = %s
            """,
            [PAGE_NAME_HOME],
        )
        columns = [c[0] for c in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]

    rows.sort(key=lambda r: _block_type_sort_key(r.get("block_type") or ""))
    return rows


# Если в контенте нет ни одного текстового языка — куда продублировать ссылки на фото
_FALLBACK_LANGS = ("am", "ru", "en")


def _block_json_key(block_type: str) -> str:
    """Ключ в ответе: как в БД, но в нижнем регистре (line-1, photo-2)."""
    return (block_type or "").strip().lower()


def _page_key_str(raw) -> str:
    """Ключ группы внутри языка — значение page_key из БД."""
    if raw is None:
        return "default"
    s = str(raw).strip()
    return s if s else "default"


def _collect_all_text_language_codes(rows) -> list[str]:
    codes: list[str] = []
    seen: set[str] = set()
    for row in rows:
        p = parse_information_content(row.get("content"))
        if p.get("kind") != "texts":
            continue
        for code in p.get("language_order") or []:
            if code not in seen:
                seen.add(code)
                codes.append(code)
        for code in (p.get("languages") or {}):
            if code not in seen:
                seen.add(code)
                codes.append(code)
    return codes


def home_page_payload() -> dict:
    """
    { "am": { "header": {...}, "About": {...}, "branches": { ... } }, "ru": { ... } }.
    Ключ "branches" в конце — данные как у list_of_branches (url_path departaments/).
    """
    rows = fetch_home_page_rows()
    lang_codes = _collect_all_text_language_codes(rows)
    if not lang_codes:
        lang_codes = list(_FALLBACK_LANGS)

    out: dict[str, dict[str, dict[str, str]]] = {c: {} for c in lang_codes}
    # (page_key, block_key, url) — для подстановки фото новому языку
    photo_entries: list[tuple[str, str, str]] = []

    for row in rows:
        bt_raw = row.get("block_type")
        if not bt_raw:
            continue
        page_key = _page_key_str(row.get("page_key"))
        block_key = _block_json_key(bt_raw)
        p = parse_information_content(row.get("content"))
        kind = p.get("kind")

        if kind == "texts":
            for code, text in (p.get("languages") or {}).items():
                if code not in out:
                    out[code] = {}
                    for pkj, bk, pu in photo_entries:
                        out[code].setdefault(pkj, {})[bk] = pu
                out[code].setdefault(page_key, {})[block_key] = text
        elif kind == "photo":
            url = p.get("photo") or ""
            photo_entries.append((page_key, block_key, url))
            for bucket in out.values():
                bucket.setdefault(page_key, {})[block_key] = url

    # В конце каждого языка — те же данные, что и у /api/branches (departaments/)
    from list_of_branches.list_og_branches import branches_payload

    branches_by_lang = branches_payload()
    merged: dict[str, dict] = {}
    lang_order: list[str] = []
    seen_lang: set[str] = set()
    for c in out:
        lang_order.append(c)
        seen_lang.add(c)
    for c in branches_by_lang:
        if c not in seen_lang:
            lang_order.append(c)
            seen_lang.add(c)
    for code in lang_order:
        home_lang = dict(out.get(code, {}))
        home_lang["branches"] = dict(branches_by_lang.get(code, {}))
        merged[code] = home_lang
    return merged


@csrf_exempt
@require_http_methods(["GET", "POST"])
def home_page_view(request):
    """
    GET/POST — главная по языкам + в конце каждого языка ключ "branches" (филиалы).
    """
    try:
        return JsonResponse(home_page_payload(), status=200, json_dumps_params={"ensure_ascii": False})
    except DatabaseError as exc:
        payload = {"error": "Ошибка базы данных"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=500)
