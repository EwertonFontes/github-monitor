from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from models import Repository, Commit
from serializers import RepositorySerializer, CommitSerializer
from repositories.github.repository import GithubRepository

class RepositoryList(APIView):
    """
    List all repositories, or create a repository.
    """
    def get(self, request, format=None):
        repositories = Repository.objects.all()
        serializer = RepositorySerializer(repositories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        github_repository = GithubRepository()
        serializer = RepositorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not github_repository.is_valid_repo(
            user=request.data['user'],
            repository=request.data['name']
        ):
            return Response('Repositorio não encontrado', status=status.HTTP_404_NOT_FOUND)
        
        repo = serializer.save()
        commits = github_repository.get_commits(
            user=request.data['user'],
            repository=request.data['name'],
            repo_id=repo.id
        )
        if commits:
            for commit in commits:
                commit_serializer = CommitSerializer(data=commit.__dict__)
                commit_serializer.is_valid(raise_exception=True)
                commit_serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)