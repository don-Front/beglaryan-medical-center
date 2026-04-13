import json

from django.db import DatabaseError, connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


@csrf_exempt
@require_http_methods(["POST"])
def select_info_to_db(request):
    try:
        data = json.loads(request.body)
        page_id = data.get("page_id")
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT page_id, block_type, sort_order, content FROM page_blocks WHERE page_id = %s",
                [page_id],
            )
            columns = [col[0] for col in cursor.description]
            rows = []
            for row in cursor.fetchall():
                item = dict(zip(columns, row))
                raw_content = item.get("content")
                if isinstance(raw_content, str):
                    try:
                        item["content"] = json.loads(raw_content)
                    except (json.JSONDecodeError, TypeError):
                        pass
                rows.append(item)
            return JsonResponse({"info": rows}, status=200)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except DatabaseError:
        return JsonResponse({"error": "Database error"}, status=500)
