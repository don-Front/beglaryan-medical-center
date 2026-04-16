# Скопируйте фрагмент ниже в ваш config/urls.py (рядом с api/save-info и т.д.).
#
# 1) Вверху файла добавьте импорт (если уже есть другие из Home_page — в ту же группу):
#
#     from Home_page.parents_api import insert_parent_block_api
#
# Если импорт падает с ModuleNotFoundError, проверьте:
#   - папка Home_page лежит рядом с manage.py и в INSTALLED_APPS есть "Home_page";
#   - папка back доступна как пакет (лежит в PYTHONPATH / корне проекта, есть back/__init__.py).
#
# 2) В список urlpatterns добавьте ДВЕ строки (как у вас для save-info — со слэшем и без):
#
#     path("api/parents/block/", insert_parent_block_api, name="insert_parent_block"),
#     path("api/parents/block", insert_parent_block_api, name="insert_parent_block_no_slash"),
#
# 3) Перезапустите runserver.
#
# Postman: POST http://127.0.0.1:8000/api/parents/block/
# Body raw JSON:
# {"parent_id": 42, "page_url":"Ginekologia/","block_type":"header","style":"w:32px;h:32px;..."}
