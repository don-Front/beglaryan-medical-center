"""
Вставка блока в таблицу parents: parent_id приходит с фронта, плюс url страницы, тип блока, стиль.

Ожидаемая структура (PostgreSQL), включая url страницы:

  CREATE TABLE parents (
      id SERIAL PRIMARY KEY,
      parent_id INT UNIQUE NOT NULL,
      page_url VARCHAR(500),
      block_type VARCHAR(100),
      style TEXT
  );

Если колонки page_url ещё нет:

  ALTER TABLE parents ADD COLUMN page_url VARCHAR(500);
"""
from __future__ import annotations

import os
from typing import Any


def _parse_parent_id(value: Any) -> int:
    """Преобразует parent_id с фронта в int."""
    if value is None:
        raise ValueError("parent_id обязателен")
    if isinstance(value, bool):
        raise ValueError("parent_id должен быть числом")
    if isinstance(value, float):
        if not value.is_integer():
            raise ValueError("parent_id должен быть целым числом")
        return int(value)
    if isinstance(value, int):
        return value
    if isinstance(value, str):
        s = value.strip()
        if not s or not s.lstrip("-").isdigit():
            raise ValueError("parent_id должен быть целым числом")
        return int(s)
    raise ValueError("parent_id должен быть целым числом")


def insert_parent_block(
    parent_id: Any,
    page_url: str,
    block_type: str,
    style: str,
) -> dict[str, Any]:
    """
    Сохраняет строку в parents: parent_id (с фронта), page_url, block_type, style.

    Пример style:
      w:32px;h:32px;disp:flex;ai:center;jc:center;fs:14px;fw:bold;color:white;
      bg-color:#666;p:5px;m:10px;

    Возвращает словарь с полями из RETURNING: id, parent_id, page_url, block_type, style.
    """
    pid = _parse_parent_id(parent_id)
    page_url = (page_url or "").strip()
    block_type = (block_type or "").strip()
    style = style or ""

    try:
        from django.db import connection, transaction

        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO parents (parent_id, page_url, block_type, style)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, parent_id, page_url, block_type, style
                    """,
                    (pid, page_url, block_type, style),
                )
                row = cursor.fetchone()
                cols = [c[0] for c in cursor.description]
                return dict(zip(cols, row))
    except ImportError:
        import psycopg2

        conn = psycopg2.connect(
            dbname=os.environ.get("PGDATABASE", "postgres"),
            user=os.environ.get("PGUSER", "postgres"),
            password=os.environ.get("PGPASSWORD", ""),
            host=os.environ.get("PGHOST", "localhost"),
            port=os.environ.get("PGPORT", "5432"),
        )
        try:
            with conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO parents (parent_id, page_url, block_type, style)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id, parent_id, page_url, block_type, style
                        """,
                        (pid, page_url, block_type, style),
                    )
                    row = cursor.fetchone()
                    cols = [c[0] for c in cursor.description]
                    return dict(zip(cols, row))
        finally:
            conn.close()


# --- HTTP (Django): подключите в config/urls.py -----------------------------
#
#   path("api/parents/block/", insert_parent_block_api, name="insert_parent_block"),
#
# Импорт (путь подстройте под ваш проект), например:
#   from back.insert_info.inssert_info import insert_parent_block_api


def _insert_parent_block_api(request):
    """
    POST JSON: { "parent_id": 123, "page_url": "...", "block_type": "header", "style": "w:32px;..." }
    Поля url и page_url — синонимы для адреса страницы.
    """
    import json

    from django.conf import settings
    from django.db import DatabaseError, IntegrityError
    from django.http import JsonResponse

    try:
        data = json.loads(request.body.decode() or "{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Некорректный JSON"}, status=400)

    parent_id = data.get("parent_id")
    page_url = data.get("page_url") if data.get("page_url") is not None else data.get("url")
    block_type = data.get("block_type")
    style = data.get("style")

    if parent_id is None or page_url is None or block_type is None or style is None:
        return JsonResponse(
            {
                "error": "Нужны поля parent_id, page_url (или url), block_type и style",
            },
            status=400,
        )

    try:
        row = insert_parent_block(parent_id, str(page_url), str(block_type), str(style))
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)
    except IntegrityError as exc:
        payload = {"error": "Такой parent_id уже существует (нарушение UNIQUE)"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=409)
    except DatabaseError as exc:
        payload = {"error": "Ошибка базы данных"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return JsonResponse(payload, status=500)
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=500)

    return JsonResponse(row, status=201, json_dumps_params={"ensure_ascii": False})


try:
    from django.views.decorators.csrf import csrf_exempt
    from django.views.decorators.http import require_http_methods

    insert_parent_block_api = csrf_exempt(
        require_http_methods(["POST"])(_insert_parent_block_api)
    )
except ImportError:
    insert_parent_block_api = _insert_parent_block_api  # без декораторов, если нет Django
