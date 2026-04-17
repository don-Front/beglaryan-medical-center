"""
Выборка по странице: GET с параметрами url (как page_url) и lang (am | ru | en).
Возвращает строки из parents и subsidiary для этой страницы; для subsidiary content
разбирается JSON — текст/подпись на выбранном языке, для фото — путь и URL для <img>.
"""
from __future__ import annotations

import json
from typing import Any

_ALLOWED_LANGS = frozenset({"am", "ru", "en"})


def _norm_page_url(url: str) -> str:
    return (url or "").strip()


def _parse_content_row(raw: str | None, lang: str) -> dict[str, Any]:
    """
    Разбор content (JSON): текст или {type: photo, path, am, ru, en}.
    Возвращает служебные поля для ответа API.
    """
    out: dict[str, Any] = {
        "kind": "unknown",
        "text": "",
        "photo_path": None,
        "caption": "",
    }
    if not raw or not str(raw).strip():
        return out

    try:
        data = json.loads(raw)
    except (json.JSONDecodeError, TypeError):
        out["kind"] = "text"
        out["text"] = str(raw)
        return out

    if not isinstance(data, dict):
        out["kind"] = "text"
        out["text"] = str(raw)
        return out

    if data.get("type") == "photo":
        out["kind"] = "photo"
        out["photo_path"] = data.get("path") or ""
        cap = str(data.get(lang, "") or "").strip()
        if not cap:
            cap = str(data.get("description", "") or "")
        out["caption"] = cap
        return out

    out["kind"] = "text"
    out["text"] = str(data.get(lang, "") or "")
    return out


def fetch_parents_subsidiary_by_page_url(page_url: str) -> tuple[list[dict], list[dict]]:
    """Сырые строки из БД: parents и subsidiary с совпадающим url страницы."""
    from django.db import connection

    pu = _norm_page_url(page_url)
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT id, parent_id, page_url, block_type, style
            FROM parents
            WHERE page_url = %s
            ORDER BY id
            """,
            [pu],
        )
        pc = [c[0] for c in cursor.description]
        parents = [dict(zip(pc, row)) for row in cursor.fetchall()]

        cursor.execute(
            """
            SELECT id, url, parent_id, content, style, bloc_type
            FROM subsidiary
            WHERE url = %s
            ORDER BY id
            """,
            [pu],
        )
        sc = [c[0] for c in cursor.description]
        subsidiary = [dict(zip(sc, row)) for row in cursor.fetchall()]

    return parents, subsidiary


def build_response_payload(
    page_url: str,
    lang: str,
    *,
    media_url_prefix: str = "/media/",
) -> dict[str, Any]:
    """
    parents — как в БД.
    subsidiary — плюс разбор content: text_for_lang, image_url (если фото), kind.
    """
    lang = (lang or "ru").strip().lower()
    if lang not in _ALLOWED_LANGS:
        lang = "ru"

    pu = _norm_page_url(page_url)
    parents, subsidiary_raw = fetch_parents_subsidiary_by_page_url(pu)

    media_base = media_url_prefix.rstrip("/") + "/"

    subsidiary_out: list[dict[str, Any]] = []
    for row in subsidiary_raw:
        cid = row.get("id")
        surl = row.get("url")
        pid = row.get("parent_id")
        raw_content = row.get("content")
        style = row.get("style")
        bloc_type = row.get("bloc_type")

        parsed = _parse_content_row(raw_content, lang)
        item: dict[str, Any] = {
            "id": cid,
            "url": surl,
            "parent_id": pid,
            "style": style,
            "bloc_type": bloc_type,
            "content_raw": raw_content,
            "kind": parsed["kind"],
            "text_for_lang": parsed["text"] if parsed["kind"] == "text" else "",
            "caption_for_lang": parsed["caption"] if parsed["kind"] == "photo" else "",
        }
        if parsed["kind"] == "photo" and parsed["photo_path"]:
            rel = str(parsed["photo_path"]).lstrip("/")
            item["image_url"] = f"{media_base}{rel}"
            item["photo_path"] = parsed["photo_path"]
        else:
            item["image_url"] = None
            item["photo_path"] = None

        subsidiary_out.append(item)

    return {
        "url": pu,
        "lang": lang,
        "parents": parents,
        "subsidiary": subsidiary_out,
    }


def select_by_url_lang_view(request):
    """GET ?url=...&lang=ru"""
    from django.conf import settings
    from django.db import DatabaseError
    from django.http import JsonResponse

    page_url = request.GET.get("url") or request.GET.get("page_url")
    lang = request.GET.get("lang") or request.GET.get("language") or "ru"

    if not page_url or not str(page_url).strip():
        return JsonResponse(
            {"error": "Укажите url или page_url (адрес страницы, например Ginekologia/)"},
            status=400,
        )

    media_prefix = getattr(settings, "MEDIA_URL", "/media/") or "/media/"

    try:
        payload = build_response_payload(
            str(page_url).strip(),
            str(lang).strip(),
            media_url_prefix=media_prefix,
        )
    except DatabaseError as exc:
        err = {"error": "Ошибка базы данных"}
        if settings.DEBUG:
            err["detail"] = str(exc)
        return JsonResponse(err, status=500)

    return JsonResponse(
        payload,
        status=200,
        json_dumps_params={"ensure_ascii": False},
    )


try:
    from django.views.decorators.http import require_GET

    select_by_url_lang = require_GET(select_by_url_lang_view)
except ImportError:
    select_by_url_lang = select_by_url_lang_view
