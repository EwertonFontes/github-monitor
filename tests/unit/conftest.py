import pytest
from repositories.github.repository import GithubRepository

@pytest.fixture
def github_repository():
    yield GithubRepository()