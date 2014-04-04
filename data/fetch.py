import json
from behance_python.api import API
from behance_python.user import User


public_key = "sGRp891umgwx4IT318rFcueQcjmr9bt3"
behance = API(public_key)

class FetchBehance():
    """docstring for FetchBehance"""
    def __init__(self, to_fetch={ 'users': [], 'tag': [], }):
        self.to_fetch = to_fetch
        self.data = {
            'projects': [],
        }

    def fetch(self):
        self.fetch_projects()
        self.fetch_project_details()
        return self

    def fetch_projects(self):
        for user_to_fetch in self.to_fetch['users']:
            user = User(user_to_fetch, public_key)
            projects = user.get_projects()
            for project in projects:
                if self.to_fetch['tag'] in project['fields']:
                    self.data['projects'].append(project)

    def fetch_project_details(self):
        for project_to_fetch in self.data['projects']:
            project_details = behance.get_project(
                                        project_to_fetch['id'])
            project_to_fetch['details'] = project_details

        pass

    def write(self):
        print "writing data"
        with open('./data/projects.json', 'w') as users:
            users.write(json.dumps(self.data['projects']))

if __name__ == '__main__':
    fetch = FetchBehance({
        'users': ['ZasharyCaro',
                  'JLung',
                  'andiedinkin',
                  'spark19'],
        'tag': 'Fine Arts',
    })

    fetch.fetch().write()