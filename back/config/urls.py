"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from About.about import about_view
from Home_page.home_page import home_page_view
from branches.branches import branches_directions_view
from list_of_branches.list_og_branches import branches_list_view
from directions.diractions import page_by_url_path_view
from create_block.save_info_to_db import save_info_to_db
from create_block.Select_info_to_db import select_info_to_db
from login.login import login_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/save-info/', save_info_to_db, name='save_info_to_db'),
    path('api/save-info', save_info_to_db),
    path('api/select-info/', select_info_to_db, name='select_info_to_db'),
    path('api/select-info', select_info_to_db),
    path('api/select_info_to_db/', select_info_to_db),
    path('api/select_info_to_db', select_info_to_db),
    path('api/login', login_view, name='login'),
    path('api/home-page/', home_page_view, name='home_page'),
    path('api/home-page', home_page_view),
    path('api/about/', about_view, name='about_page'),
    path('api/about', about_view),
    path('api/branches/', branches_list_view, name='branches_list'),
    path('api/branches', branches_list_view),
    path('api/directions/', branches_directions_view, name='branches_directions'),
    path('api/directions', branches_directions_view),
    path('api/content-by-url/', page_by_url_path_view, name='content_by_url_path'),
    path('api/content-by-url', page_by_url_path_view),
    path('', include('messages.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
