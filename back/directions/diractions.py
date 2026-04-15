"""
Контент страницы по url_path из information_about_page.
Фронт передаёт url_path (например Ginekologia/) — ответ по языкам, блоки отсортированы по block_type.
"""
import json

from django.conf import settings
from django.db import DatabaseError, connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from Home_page.home_page import (
    _FALLBACK_LANGS,
    _block_json_key,
    _block_type_sort_key,
    _collect_all_text_language_codes,
    _page_key_str,
    parse_information_content,
)


def fetch_rows_by_url_path(url_path: str) -> list[dict]:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT page_key, block_type, content
            FROM information_about_page
            WHERE url_path = %s
            """,
            [url_path],
        )
        columns = [c[0] for c in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]

    rows.sort(key=lambda r: _block_type_sort_key(r.get("block_type") or ""))
    return rows


def page_by_url_path_payload(url_path: str) -> dict:
    """
    { "am": { "<page_key>": { "line-3": "...", "line-4": "..." } }, "ru": ... }.
    Порядок обхода строк — по block_type (Line-3, Line-4, …); ключи блоков в нижнем регистре.
    """
    rows = fetch_rows_by_url_path(url_path)
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

    return out


def _get_url_path_from_request(request):
    q = request.GET.get("url_path") or request.GET.get("url")
    if q is not None:
        return (str(q).strip(), None)
    if request.method != "POST" or not request.body:
        return (None, None)
    try:
        data = json.loads(request.body.decode() or "{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return (None, "Некорректный JSON")
    path = data.get("url_path") or data.get("url")
    if path is None:
        return (None, None)
    return (str(path).strip(), None)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def page_by_url_path_view(request):
    url_path, err = _get_url_path_from_request(request)
    if err:
        return JsonResponse({"error": err}, status=400)
    if not url_path:
        return JsonResponse(
            {"error": "Укажите url_path (или url) в query или в JSON теле POST"},
            status=400,
        )

    try:
        return JsonResponse(
            page_by_url_path_payload(url_path),
            status=200,
            json_dumps_params={"ensure_ascii": False},
        )
    except DatabaseError as exc:
        payload = {"error": "Ошибка базы данных"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=500)
