import django_filters
from .models import Commit

class CommitFilter(django_filters.FilterSet):
    author = django_filters.CharFilter(lookup_expr='iexact')
    repository = django_filters.NumberFilter()

    class Meta:
        model = Commit
        fields = (
            'message',
            'sha',
            'author',
            'url',
            'avatar',
            'date',
            'repository',
        )