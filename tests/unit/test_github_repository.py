import pytest
from repositories.github.models import Commit

def test_true_valid_repo(github_repository):
    is_valid = github_repository.is_valid_repo(
        user='EwertonFontes', repository='comentarios'
    )

    assert isinstance(is_valid, bool)
    assert is_valid is True

def test_false_valid_repo(github_repository):
    is_valid = github_repository.is_valid_repo(
        user='EwertonFontes', repository='github-monitr'
    )

    assert isinstance(is_valid, bool)
    assert is_valid is False

def test_get_commits(github_repository):
    commits = github_repository.get_commits(
        user='EwertonFontes', 
        repository='github-monitor', 
        repo_id=1
    )

    assert isinstance(commits, list)
    assert len(commits) > 0 

def test_get_empy_commits(github_repository):
    commits = github_repository.get_commits(
        user='EwertonFontes', 
        repository='github-monitr', 
        repo_id=1
    )

    assert len(commits) == 0 
