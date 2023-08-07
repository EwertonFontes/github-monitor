from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer

@permission_classes([IsAuthenticated])
class RepositoryList(generics.ListCreateAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

    
