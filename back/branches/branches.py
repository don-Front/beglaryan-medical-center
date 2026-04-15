"""
Направления (филиалы) по url_path = departaments/, только текст — без фотографий.
"""
from django.conf import settings
from django.db import DatabaseError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from Home_page.home_page import (
    _FALLBACK_LANGS,
    _collect_all_text_language_codes,
    _page_key_str,
    parse_information_content,
)
from list_of_branches.list_og_branches import fetch_branches_rows


def branches_directions_payload() -> dict:
    rows = fetch_branches_rows()
    lang_codes = _collect_all_text_language_codes(rows)
    if not lang_codes:
        lang_codes = list(_FALLBACK_LANGS)

    out: dict[str, dict[str, dict[str, str]]] = {c: {} for c in lang_codes}

    for row in rows:
        bt_raw = row.get("block_type")
        if not bt_raw:
            continue
        p = parse_information_content(row.get("content"))
        if p.get("kind") != "texts":
            continue
        page_key = _page_key_str(row.get("page_key"))
        block_key = (bt_raw or "").strip()
        for code, text in (p.get("languages") or {}).items():
            if code not in out:
                out[code] = {}
            out[code].setdefault(page_key, {})[block_key] = text

    return out


@csrf_exempt
@require_http_methods(["GET", "POST"])
def branches_directions_view(request):
    try:
        return JsonResponse(
            branches_directions_payload(),
            status=200,
            json_dumps_params={"ensure_ascii": False},
        )
    except DatabaseError as exc:
        payload = {"error": "Ошибка базы данных"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=500)
