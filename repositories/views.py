from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from repositories.github.repository import GithubRepository

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def commit_list_view(request):
    commits = Commit.objects.all()
    serializer = CommitSerializer(commits, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def repository_list_view(request):
    repositories = Repository.objects.all()
    serializer = RepositorySerializer(repositories, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def repository_create_view(request):
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
