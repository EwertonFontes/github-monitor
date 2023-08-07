import requests
from os import getenv
from datetime import datetime, timedelta

from repositories.github.models import Commit

class GithubRepository:
    def __init__(
        self,
    ):
        self.base_url = 'https://api.github.com'
        self.token = getenv('GITHUB_TOKEN')
        self.headers = {'Authorization': ''}

    def is_valid_repo(self, user: str, repository: str) -> bool:
        response = requests.get(url=f"{self.base_url}/users/{user}/repos")
        
        if not response.ok:
            return False
        
        repos = response.json()
        repos_name = [repo['name'] for repo in repos]
        return True if repository in repos_name else False
    
    def get_commits(self, user: str, repository: str, repo_id: int) -> list[Commit]:
        last_thirdy_days = datetime.now() - timedelta(days=30)
        params = {"since": last_thirdy_days.strftime('%Y/%m/%d')}
        response = requests.get(
            url=f"{self.base_url}/repos/{user}/{repository}/commits",
            params=params
        )
        if not response.ok:
            return []
        
        commits = response.json()
        list_commits = []
        for commit in commits:
            list_commits.append(
                Commit(
                    message=commit['commit']['message'],
                    sha=commit['sha'],
                    author=commit['author']['login'],
                    url=commit['commit']['url'],
                    date=commit['commit']['author']['date'],
                    avatar=commit['author']['avatar_url'],
                    repository=repo_id,
                )
            )
        return list_commits

