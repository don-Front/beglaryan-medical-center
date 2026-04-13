"""
POST /api/login — JSON {"email": "...", "password": "..."}.
Проверка users (email + password_hash через check_password), JWT в HttpOnly cookie.
"""
import json

import jwt
from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

COOKIE_NAME = "access_token"
# Время жизни cookie (JWT без exp в payload — ограничение на стороне браузера)
COOKIE_MAX_AGE = 60 * 60 * 24 * 7


def _fail_401():
    return JsonResponse(
        {"success": False, "message": "Неверный логин или пароль"},
        status=401,
    )


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body.decode() or "{}")
    except json.JSONDecodeError:
        return _fail_401()

    email = (data.get("email") or "").strip()
    password = data.get("password")
    if not email or password is None or password == "":
        return _fail_401()

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT password_hash FROM users WHERE LOWER(email) = LOWER(%s)",
            [email],
        )
        row = cursor.fetchone()

    if not row or not check_password(password, row[0]):
        return _fail_401()

    payload = {"email": email, "role": "admin"}
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")

    response = JsonResponse({"success": True, "role": "admin"})
    response.set_cookie(
        COOKIE_NAME,
        token,
        max_age=COOKIE_MAX_AGE,
        httponly=True,
        samesite="Lax",
        secure=not settings.DEBUG,
    )
    return response
