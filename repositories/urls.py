from django.urls import path

from .views import commit_list_view, repository_create_view, repository_list_view

app_name = 'repositories'

urlpatterns = [
    path('api/commits/', commit_list_view, name='commits-list'),
    path('api/repositories/', repository_create_view, name='repositories-create'),
    path('api/repositories/', repository_list_view, name='repositories-list'),
]
