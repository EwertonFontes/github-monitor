from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from .views import RepositoryList
from repositories.presentation.commit_list import CommitList

app_name = 'repositories'

urlpatterns = [
    path('api/repositories/', RepositoryList.as_view()),
    path('api/commits/', CommitList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
