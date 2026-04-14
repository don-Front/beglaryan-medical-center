
import json

from django.conf import settings
from django.db import DatabaseError, connection, transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

REQUIRED_FIELDS = ("page_id", "block_type", "sort_order", "content")


@csrf_exempt
@require_http_methods(["POST"])
def save_info_to_db(request):
    try:
        raw = request.body.decode() or "{}"
        data = json.loads(raw)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"ok": False, "message": "Некорректный JSON"},
            status=400,
        )

    missing = [k for k in REQUIRED_FIELDS if k not in data]
    if missing:
        return JsonResponse(
            {
                "ok": False,
                "message": "Не хватает полей",
                "missing": missing,
            },
            status=400,
        )

    page_id = data["page_id"]
    block_type = data["block_type"]
    sort_order = data["sort_order"]
    content = data["content"]

    try:
        page_id = int(page_id)
        sort_order = int(sort_order)
    except (TypeError, ValueError):
        return JsonResponse(
            {"ok": False, "message": "page_id и sort_order должны быть числами"},
            status=400,
        )

    if not isinstance(block_type, str) or not block_type.strip():
        return JsonResponse(
            {"ok": False, "message": "block_type должен быть непустой строкой"},
            status=400,
        )

    if isinstance(content, (dict, list)):
        content_str = json.dumps(content, ensure_ascii=False)
    elif content is None:
        return JsonResponse(
            {"ok": False, "message": "content не может быть null"},
            status=400,
        )
    else:
        content_str = str(content)

    try:
        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO page_blocks (page_id, block_type, sort_order, content)
                    VALUES (%s, %s, %s, %s)
                    """,
                    [page_id, block_type.strip(), sort_order, content_str],
                )
    except DatabaseError as exc:
        print("[save_info_to_db] DB error:", exc)
        payload = {"ok": False, "message": "Ошибка записи в БД"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=500)

    print("[save_info_to_db]", data)
    return JsonResponse(
        {
            "ok": True,
            "saved": {
                "page_id": page_id,
                "block_type": block_type.strip(),
                "sort_order": sort_order,
                "content": content_str,
            },
        }
    )
