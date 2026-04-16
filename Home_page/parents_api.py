"""
Эндпоинт вставки блока в parents — подключайте в config/urls.py, как api/save-info.

Импорт вьюхи из модуля insert_info (тот же уровень, что и остальные обработчики Home_page).
"""
from insert_info.inssert_info import insert_parent_block_api

__all__ = ["insert_parent_block_api"]
