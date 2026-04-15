"""
Список филиалов: url_path = departaments/ (как в БД).
Ответ: { "am": { "<page_key>": { "<block_type>": "…" } }, "ru": … } — весь текст по языкам.
Порядок строк как в БД (ORDER BY id), без сортировки по Line/Photo.
"""
from django.conf import settings
from django.db import DatabaseError, connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from Home_page.home_page import (
    _FALLBACK_LANGS,
    _collect_all_text_language_codes,
    _page_key_str,
    parse_information_content,
)

URL_PATH_BRANCHES = "departaments/"


def fetch_branches_rows() -> list[dict]:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT page_key, block_type, content
            FROM information_about_page
            WHERE url_path = %s
            ORDER BY id
            """,
            [URL_PATH_BRANCHES],
        )
        columns = [c[0] for c in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def branches_payload() -> dict:
    rows = fetch_branches_rows()
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
        block_key = (bt_raw or "").strip()
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
def branches_list_view(request):
    try:
        return JsonResponse(
            branches_payload(),
            status=200,
            json_dumps_params={"ensure_ascii": False},
        )
    except DatabaseError as exc:
        payload = {"error": "Ошибка базы данных"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=500)
