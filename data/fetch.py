import json
from behance_python.api import API
from behance_python.user import User
from behance_python.exceptions import BehanceException


public_key = "sGRp891umgwx4IT318rFcueQcjmr9bt3"
behance = API(public_key)

class FetchBehance():
    """docstring for FetchBehance"""
    def __init__(self, to_fetch={ 'students': [], 'tag': [], }):
        self.to_fetch = to_fetch
        self.data = {
            'projects': [],
            'temp_projects': [],
        }
        self.complete_fetch = False

    def fetch(self):
        projects_fetched = self.fetch_projects()
        details_fected = self.fetch_project_details()

        if projects_fetched and details_fected:
            self.complete_fetch = True

        return self

    def fetch_projects(self):
        for student in self.to_fetch['students']:
            user_to_fetch = student['username']

            print "User: {0}".format(user_to_fetch)

            try:
                user = User(user_to_fetch, public_key)
                projects = user.get_projects()

            except BehanceException as e:
                print "Problem with Behance API. {0}".format(e)
                if (e.error_code == 429):
                    return False

            for project in projects:
                project['risd_program'] = student['program']
                self.data['temp_projects'].append(project)

        return True

    def fetch_project_details(self):
        for project_to_fetch in self.data['temp_projects']:
            print "Project Details"

            try:
                project_details = behance.get_project(
                                        project_to_fetch['id'])
            except BehanceException as e:
                print "Problem with Behance API. {0}".format(e)
                if (e.error_code == 429):
                    return False

            add_project = False

            # this will enforce the tag being in there
            for tag in project_details['tags']:
                if tag.lower() == self.to_fetch['tag'].lower() or\
                   ''.join(tag.split(' ')).lower() ==\
                     ''.join(self.to_fetch['tag'].split(' ')).lower():
                    
                    add_project = True

            if add_project:
                project_to_fetch['details'] = project_details
                self.data['projects'].append(project_to_fetch)

        return True


    def write(self):
        if (self.complete_fetch):
            print "Writing data with " +\
                  "{0} projects!".format(len(self.data['projects']))

            with open('./data/projects.json', 'w') as users:
                users.write(json.dumps(self.data['projects']))

        else:
            print "Did not complete fetch. Not writing data."

if __name__ == '__main__':
    print "Fetching data from Behance."
    fetch = FetchBehance({
        'students': [{
            'username': 'mariacamarena',
            'program': 'Furniture',
        }, {
            'username': 'teeshape',
            'program': 'Industrial Design',
        }, {
            'username': 'SeulbiKim',
            'program': 'Industrial Design',
        }, {
            'username': 'aneliseschroeder',
            'program': 'Furniture',
        }, {
            'username': 'laurentedeschi',
            'program': 'Industrial Design',
        }, {
            'username': 'katherineporter',
            'program': 'Interior Studies',
        }, {
            'username': 'risdmediadevelopers',
            'program': 'Textiles',
        }],
        'tag': 'Grad Show 2014',
    })

    fetch.fetch().write()