import requests
from os import getenv

class GithubRepository:
    def __init__(
        self,
    ):
        self.base_url = 'https://api.github.com'
        self.token = getenv('GITHUB_TOKEN')
        self.headers = {'Authorization': ''}

    def is_valid_repo(self, repository: str) -> bool:
        response = requests.get(url=f"{self.base_url}/users/EwertonFontes/repos")
        if not response.ok:
            return False
        
        repos = response.json()
        repos_name = [repo['name'] for repo in repos]
        return True if repository in repos_name else False
            