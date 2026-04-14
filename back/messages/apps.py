from django.apps import AppConfig


class MessagesConfig(AppConfig):
    name = "messages"
    # В Django уже есть приложение django.contrib.messages с label="messages".
    # Чтобы не было конфликта при запуске/проверке приложения, задаём уникальный label.
    label = "messages_custom"

