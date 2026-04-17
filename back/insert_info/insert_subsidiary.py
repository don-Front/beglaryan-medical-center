"""
Вставка строки в subsidiary: id, url, parent_id (ссылка на строку в parents), content, style, bloc_type.

Колонка url — обязательный адрес/путь страницы с фронта (например Ginekologia/), чтобы знать,
к какой странице относится блок.

content — либо многоязычный текст (am / ru / en), либо для фото: JSON с полем path (путь к файлу
в media, например photos/uuid.jpg) и подписями am/ru/en.

Ожидаемая таблица (PostgreSQL):

  CREATE TABLE subsidiary (
      id VARCHAR(500) PRIMARY KEY,
      url VARCHAR(500),
      parent_id INT NOT NULL REFERENCES parents(parent_id) ON DELETE CASCADE,
      content TEXT,
      style TEXT,
      bloc_type VARCHAR(100)
  );

  Уже созданная таблица: migrations/002_subsidiary_add_bloc_type.sql

В колонку subsidiary.parent_id записывается то же значение, что в parents.parent_id
(внешний ключ на parents(parent_id); см. migrations/001_subsidiary_fk_parents_parent_id.sql).
В запросе можно передать либо parents.id (SERIAL), либо parents.parent_id — в БД сохранится
parents.parent_id.

Multipart (фото + описание в одном запросе): файл — поле content (тип File); подписи —
content_am / content_ru / content_en, или одним JSON в полях text / photo_text / content_text
(например {\"am\":\"...\",\"ru\":\"...\",\"en\":\"...\"}), плюс опционально description
(общее описание; если нет am/ru/en — дублируется во все языки). Поля: id, parent_id, style,
bloc_type (например photo), url или page_url.

JSON с фото без multipart: image_base64 (data URL или сырой base64), опционально image_filename,
content как объект am/ru/en, опционально description.
"""
from __future__ import annotations

import base64
import binascii
import json
import os
import uuid
from io import BytesIO
from pathlib import Path
from typing import Any, BinaryIO

_ALLOWED_PHOTO_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"}


def _parse_int(value: Any, field: str) -> int:
    if value is None:
        raise ValueError(f"{field} обязателен")
    if isinstance(value, bool):
        raise ValueError(f"{field} должен быть числом")
    if isinstance(value, float):
        if not value.is_integer():
            raise ValueError(f"{field} должен быть целым числом")
        return int(value)
    if isinstance(value, int):
        return value
    if isinstance(value, str):
        s = value.strip()
        if not s or not s.lstrip("-").isdigit():
            raise ValueError(f"{field} должен быть целым числом")
        return int(s)
    raise ValueError(f"{field} должен быть целым числом")


def _photos_base_dir() -> Path:
    root: Path | None = None
    try:
        from django.conf import settings

        mr = getattr(settings, "MEDIA_ROOT", None)
        if mr:
            root = Path(mr)
    except ImportError:
        pass
    if root is None:
        root = Path(__file__).resolve().parent.parent / "media"
    photos = root / "photos"
    photos.mkdir(parents=True, exist_ok=True)
    return photos


def _safe_ext(filename: str) -> str:
    suf = Path(filename or "").suffix.lower()
    if suf not in _ALLOWED_PHOTO_EXT:
        return ".jpg"
    return suf


def _resolve_parents_parent_id_column(cursor, parent_ref: int) -> int:
    """Возвращает значение parents.parent_id для строки (по parents.id или по parents.parent_id)."""
    cursor.execute(
        "SELECT parent_id FROM parents WHERE id = %s",
        (parent_ref,),
    )
    row = cursor.fetchone()
    if row and row[0] is not None:
        return int(row[0])
    cursor.execute(
        "SELECT parent_id FROM parents WHERE parent_id = %s",
        (parent_ref,),
    )
    row = cursor.fetchone()
    if row and row[0] is not None:
        return int(row[0])
    raise ValueError("Родительская запись не найдена в таблице parents")


def _serialize_text_content(content: Any) -> str:
    """Текст: dict {am, ru, en} или JSON-строка — сохраняем как JSON в content."""
    if isinstance(content, str):
        s = content.strip()
        if not s:
            return "{}"
        try:
            parsed = json.loads(s)
            if isinstance(parsed, dict):
                return json.dumps(
                    {
                        "am": str(parsed.get("am", "")),
                        "ru": str(parsed.get("ru", "")),
                        "en": str(parsed.get("en", "")),
                    },
                    ensure_ascii=False,
                )
        except json.JSONDecodeError:
            pass
        return json.dumps({"am": s, "ru": "", "en": ""}, ensure_ascii=False)

    if isinstance(content, dict):
        return json.dumps(
            {
                "am": str(content.get("am", "")),
                "ru": str(content.get("ru", "")),
                "en": str(content.get("en", "")),
            },
            ensure_ascii=False,
        )

    raise ValueError("content для текста: объект {am, ru, en} или JSON-строка")


def _photo_content_json(file_relpath: str, captions: dict[str, str] | None) -> str:
    """
    Фото + подписи am/ru/en и опционально description (общее описание).
    Если задано только description, без am/ru/en — копируется во все три языка.
    """
    c = dict(captions or {})
    desc = str(c.pop("description", "") or "").strip()
    am = str(c.get("am", "") or "")
    ru = str(c.get("ru", "") or "")
    en = str(c.get("en", "") or "")
    if desc and not (am.strip() or ru.strip() or en.strip()):
        am = ru = en = desc
    obj: dict[str, Any] = {
        "type": "photo",
        "path": file_relpath,
        "am": am,
        "ru": ru,
        "en": en,
    }
    if desc:
        obj["description"] = desc
    return json.dumps(obj, ensure_ascii=False)


def _multipart_photo_captions(request) -> dict[str, str]:
    """Подписи к фото: content_am/ru/en + JSON в text/photo_text/content_text + description."""
    cap: dict[str, str] = {
        "am": request.POST.get("content_am") or "",
        "ru": request.POST.get("content_ru") or "",
        "en": request.POST.get("content_en") or "",
    }
    for field in ("text", "photo_text", "content_text"):
        raw = request.POST.get(field)
        if not raw or not str(raw).strip():
            continue
        try:
            tj = json.loads(raw)
        except json.JSONDecodeError:
            continue
        if not isinstance(tj, dict):
            continue
        for k in ("am", "ru", "en"):
            if not str(cap.get(k, "")).strip() and tj.get(k) is not None:
                cap[k] = str(tj[k])
    desc = (request.POST.get("description") or "").strip()
    if desc:
        cap["description"] = desc
    return cap


def _decode_image_base64_field(data: dict[str, Any]) -> BinaryIO:
    """data:image/...;base64,... или сырой base64 → BytesIO с именем для расширения."""
    raw = data.get("image_base64")
    if raw is None or not str(raw).strip():
        raise ValueError("image_base64 пуст")
    s = str(raw).strip()
    if s.startswith("data:"):
        parts = s.split(",", 1)
        if len(parts) != 2:
            raise ValueError("Некорректный data URL в image_base64")
        s = parts[1]
    try:
        binary = base64.b64decode(s, validate=False)
    except (binascii.Error, ValueError) as exc:
        raise ValueError("Некорректный base64 в image_base64") from exc
    buf = BytesIO(binary)
    buf.name = str(data.get("image_filename") or "upload.jpg")
    return buf


def insert_subsidiary(
    row_id: str,
    url: str,
    parent_ref: Any,
    content: Any,
    style: str,
    bloc_type: str = "",
    *,
    photo_file=None,
    photo_filename: str | None = None,
) -> dict[str, Any]:
    """
    Вставка в subsidiary.

    - url — всегда адрес страницы с фронта (обязателен), не путь к файлу.
    - bloc_type — тип блока с конструктора (например photo, text).
    - Без photo_file: content — текст (am/ru/en).
    - С photo_file: файл в media/photos; путь photos/... хранится в content.path; в content же am/ru/en
      и опционально description (описание). Можно передать и файл, и текст подписей в одном запросе (multipart / JSON+image_base64).
    - Если id уже есть — строка обновляется (UPSERT по первичному ключу id).
    """
    row_id = (row_id or "").strip()
    if not row_id:
        raise ValueError("id обязателен")

    page_url = (url or "").strip()
    if not page_url:
        raise ValueError(
            "url обязателен: передайте адрес страницы с фронта (например Ginekologia/)"
        )

    style = style or ""
    bloc_type = (bloc_type or "").strip()
    parent_pk = _parse_int(parent_ref, "parent_id")

    if photo_file is not None:
        ext = _safe_ext(photo_filename or getattr(photo_file, "name", "") or "")
        fname = f"{uuid.uuid4().hex}{ext}"
        dest_dir = _photos_base_dir()
        dest_path = dest_dir / fname
        if hasattr(photo_file, "chunks"):
            with open(dest_path, "wb") as out:
                for chunk in photo_file.chunks():
                    out.write(chunk)
        else:
            with open(dest_path, "wb") as out:
                out.write(photo_file.read())

        rel_path = f"photos/{fname}"
        cap = content if isinstance(content, dict) else {}
        cap_use = {k: cap.get(k, "") for k in ("am", "ru", "en")} if cap else {}
        content_str = _photo_content_json(rel_path, cap_use)
        db_url = page_url
    else:
        db_url = page_url
        content_str = _serialize_text_content(content)

    try:
        from django.db import connection, transaction

        with transaction.atomic():
            with connection.cursor() as cursor:
                stored_parent_id = _resolve_parents_parent_id_column(cursor, parent_pk)
                cursor.execute(
                    """
                    INSERT INTO subsidiary (id, url, parent_id, content, style, bloc_type)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    ON CONFLICT (id) DO UPDATE SET
                        url = EXCLUDED.url,
                        parent_id = EXCLUDED.parent_id,
                        content = EXCLUDED.content,
                        style = EXCLUDED.style,
                        bloc_type = EXCLUDED.bloc_type
                    RETURNING id, url, parent_id, content, style, bloc_type
                    """,
                    (row_id, db_url, stored_parent_id, content_str, style, bloc_type),
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
                    stored_parent_id = _resolve_parents_parent_id_column(cursor, parent_pk)
                    cursor.execute(
                        """
                        INSERT INTO subsidiary (id, url, parent_id, content, style, bloc_type)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        ON CONFLICT (id) DO UPDATE SET
                            url = EXCLUDED.url,
                            parent_id = EXCLUDED.parent_id,
                            content = EXCLUDED.content,
                            style = EXCLUDED.style,
                            bloc_type = EXCLUDED.bloc_type
                        RETURNING id, url, parent_id, content, style, bloc_type
                        """,
                        (row_id, db_url, stored_parent_id, content_str, style, bloc_type),
                    )
                    row = cursor.fetchone()
                    cols = [c[0] for c in cursor.description]
                    return dict(zip(cols, row))
        finally:
            conn.close()


def _insert_subsidiary_api(request):
    import json

    from django.conf import settings
    from django.db import DatabaseError, IntegrityError
    from django.http import JsonResponse

    ctype = (getattr(request, "content_type", None) or "").split(";")[0].strip().lower()

    if ctype == "multipart/form-data":
        # Файл фото передаётся под тем же именем, что и текст в JSON — «content» (не «photo»).
        uploaded = request.FILES.get("content")
        if uploaded:
            row_id = (request.POST.get("id") or "").strip()
            parent_ref = request.POST.get("parent_id")
            style = request.POST.get("style") or ""
            blk = (request.POST.get("bloc_type") or "").strip()
            url_hint = (request.POST.get("page_url") or request.POST.get("url") or "").strip()

            cap = _multipart_photo_captions(request)
            try:
                row = insert_subsidiary(
                    row_id,
                    url_hint,
                    parent_ref,
                    cap,
                    style,
                    blk,
                    photo_file=uploaded,
                    photo_filename=getattr(uploaded, "name", None),
                )
            except ValueError as exc:
                return JsonResponse({"error": str(exc)}, status=400)
            except IntegrityError as exc:
                payload = {"error": "Запись с таким id уже есть или нарушение внешнего ключа"}
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

        row_id = (request.POST.get("id") or "").strip()
        parent_ref = request.POST.get("parent_id")
        style = request.POST.get("style")
        blk = (request.POST.get("bloc_type") or "").strip()
        url_field = (request.POST.get("page_url") or request.POST.get("url") or "").strip()
        raw_content = request.POST.get("content")
        if raw_content:
            try:
                content = json.loads(raw_content)
            except json.JSONDecodeError:
                content = raw_content
        else:
            content = {
                "am": request.POST.get("content_am") or "",
                "ru": request.POST.get("content_ru") or "",
                "en": request.POST.get("content_en") or "",
            }
        try:
            row = insert_subsidiary(
                row_id, url_field, parent_ref, content, style or "", blk
            )
        except ValueError as exc:
            return JsonResponse({"error": str(exc)}, status=400)
        except IntegrityError as exc:
            payload = {"error": "Запись с таким id уже есть или нарушение внешнего ключа"}
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
        data = json.loads(request.body.decode() or "{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Некорректный JSON"}, status=400)

    row_id = data.get("id")
    page_url = data.get("page_url") if data.get("page_url") is not None else data.get("url")
    parent_ref = data.get("parent_id")
    style = data.get("style")
    blk = str(data.get("bloc_type", "")).strip()
    content = data.get("content")
    has_image_b64 = bool(
        data.get("image_base64") and str(data.get("image_base64", "")).strip()
    )

    if row_id is None or parent_ref is None or style is None:
        return JsonResponse(
            {"error": "Нужны поля id, parent_id и style"},
            status=400,
        )

    if not str(page_url or "").strip():
        return JsonResponse(
            {
                "error": "Нужен url или page_url — адрес страницы с фронта (например Ginekologia/)",
            },
            status=400,
        )

    if not has_image_b64 and content is None:
        return JsonResponse(
            {
                "error": "Укажите content (текст am/ru/en) или image_base64 (фото + опционально content с подписями)",
            },
            status=400,
        )

    try:
        if has_image_b64:
            buf = _decode_image_base64_field(data)
            cap: dict[str, Any] = {}
            if isinstance(content, dict):
                cap = dict(content)
            elif content is not None:
                return JsonResponse(
                    {
                        "error": "При image_base64 поле content должно быть объектом {am, ru, en} или пустым",
                    },
                    status=400,
                )
            desc = data.get("description")
            if desc is not None and str(desc).strip():
                cap["description"] = str(desc).strip()
            row = insert_subsidiary(
                str(row_id),
                str(page_url).strip(),
                parent_ref,
                cap,
                str(style),
                blk if blk else "photo",
                photo_file=buf,
                photo_filename=getattr(buf, "name", None),
            )
        else:
            row = insert_subsidiary(
                str(row_id),
                str(page_url).strip(),
                parent_ref,
                content,
                str(style),
                blk,
            )
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)
    except IntegrityError as exc:
        payload = {"error": "Запись с таким id уже есть или нарушение внешнего ключа"}
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

    insert_subsidiary_api = csrf_exempt(
        require_http_methods(["POST"])(_insert_subsidiary_api)
    )
except ImportError:
    insert_subsidiary_api = _insert_subsidiary_api
