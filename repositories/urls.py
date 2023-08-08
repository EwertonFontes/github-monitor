from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from repositories.presentation.commit_list import CommitList
from repositories.presentation.repository_list import RepositoryList


app_name = 'repositories'

urlpatterns = [
    path('api/repositories/', RepositoryList.as_view()),
    path('api/commits/', CommitList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
