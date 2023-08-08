from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from repositories.models import Commit
from repositories.serializers import CommitSerializer
from django.core.paginator import Paginator, InvalidPage, EmptyPage
from repositories.filters import CommitFilter

#@permission_classes([IsAuthenticated])
class CommitList(APIView):
    """
    List all commits.
    """
    def get(self, request, format=None):
        try:
            commits = Commit.objects.all()
            commits_filter = CommitFilter(request.GET, queryset=commits)

            paginator = Paginator(commits_filter.qs, per_page=10)
            page_number = request.GET.get('page')
            if not page_number:
                page_number = 1

            commit_page = paginator.page(page_number)  
            serializer = CommitSerializer(commit_page.object_list, many=True)
            return Response(serializer.data)
        except (EmptyPage, InvalidPage) as exc:
            return Response('Pagina invalida ou não encontrada', status=status.HTTP_404_NOT_FOUND)