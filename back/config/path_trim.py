"""
Убирает пробелы в конце path (например /api/about/%20 из Postman), чтобы URL совпал с маршрутом.
"""


class TrimPathWhitespaceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        pi = request.path_info
        stripped = pi.rstrip(" \t\r\n")
        if stripped != pi:
            request.path_info = stripped
        return self.get_response(request)
