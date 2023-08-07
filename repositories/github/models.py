from datetime import datetime
from dataclasses import dataclass

@dataclass
class Commit:
    message: str
    sha: str
    author: str
    url: str
    date: datetime
    avatar: str
    repository: int