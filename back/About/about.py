"""
Страница About: те же данные, что у Home по форме ответа, но выборка по url_path = 'About/'.
Ключи блоков в JSON: Line-1, Photo-2 (с большой буквы Line / Photo).
"""
from django.conf import settings
from django.db import DatabaseError, connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from Home_page.home_page import (
    _FALLBACK_LANGS,
    _block_type_sort_key,
    _collect_all_text_language_codes,
    _page_key_str,
    parse_information_content,
)

# Как в запросе пользователя
URL_PATH_ABOUT = "About/"


def _block_about_key(block_type: str) -> str:
    """Line-1, Photo-2 — префиксы Line и Photo с заглавной буквы."""
    s = (block_type or "").strip()
    if not s:
        return s
    parts = s.split("-", 1)
    prefix = parts[0].lower()
    rest = parts[1] if len(parts) > 1 else ""
    if prefix == "line":
        return f"Line-{rest}" if rest else "Line"
    if prefix == "photo":
        return f"Photo-{rest}" if rest else "Photo"
    return s


def fetch_about_rows() -> list[dict]:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT page_key, block_type, content
            FROM information_about_page
            WHERE url_path = %s
            """,
            [URL_PATH_ABOUT],
        )
        columns = [c[0] for c in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]

    rows.sort(key=lambda r: _block_type_sort_key(r.get("block_type") or ""))
    return rows


def about_payload() -> dict:
    """
    { "am": { "<page_key>": { "Line-1": "...", "Photo-2": "url" } }, "ru": { ... } }.
    """
    rows = fetch_about_rows()
    lang_codes = _collect_all_text_language_codes(rows)
    if not lang_codes:
        lang_codes = list(_FALLBACK_LANGS)

    out: dict[str, dict[str, dict[str, str]]] = {c: {} for c in lang_codes}
    photo_entries: list[tuple[str, str, str]] = []

    for row in rows:
        bt_raw = row.get("block_type")
        if not bt_raw:
            continue
        page_key = _page_key_str(row.get("page_key"))
        block_key = _block_about_key(bt_raw)
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

    return out


@csrf_exempt
@require_http_methods(["GET", "POST"])
def about_view(request):
    try:
        return JsonResponse(about_payload(), status=200, json_dumps_params={"ensure_ascii": False})
    except DatabaseError as exc:
        payload = {"error": "Ошибка базы данных"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=500)
