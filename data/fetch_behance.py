from behance_python.api import API
from behance_python.user import User
from behance_python.exceptions import BehanceException


# User calls _get_user_details on __init__.
# This makes a call to the API, that we don't
# need to make, since we aren't using any of
# that information, we are setting
# _get_user_details to noop
def noop(self):
    pass
setattr(User, '_get_user_details', noop)


public_key = "sGRp891umgwx4IT318rFcueQcjmr9bt3"
behance = API(public_key)

class FetchBehance():
    """docstring for FetchBehance"""
    def __init__(self,
                 logger,
                 to_fetch={ 'students': [], 'tag': [], }):
        self.to_fetch = to_fetch
        self.data = {
            'projects': [],
            'temp_projects': [],
            'formatted': [],
        }
        self.status = {
            'complete': False,
            'left_off': {
                # which dataset were we in?
                # user, projects, details
                'dataset': None,
                # what was left to go through?
                'remaining': None
            },
        }
        self.logger = logger

    def fetch(self):
        self.status['complete'] = False

        projects_fetched = self.fetch_projects()
        details_fected = self.fetch_project_details()

        if projects_fetched and details_fected:
            self.status['complete'] = True
            self.format_data()

        return self


    def fetch_projects(self):
        self.logger.info('Fetching Projects')

        for student in self.to_fetch['students']:
            user_to_fetch = student['username']

            self.logger.info("User: {0}".format(user_to_fetch))

            try:
                user = User(user_to_fetch, public_key)
                projects = user.get_projects()

            except BehanceException as e:
                self.logger.error(
                    "Problem with Behance API. {0}".format(e))
                # error code 429 is given when you
                # have made too many API calls.
                # so you won't be making more
                if (e.error_code == 429):
                    return False

            for project in projects:
                project['risd_program'] = student['program']
                self.data['temp_projects'].append(project)

        return True

    def fetch_project_details(self):
        self.logger.info('Fetching Details')

        for project_to_fetch in self.data['temp_projects']:

            try:
                project_details = behance.get_project(
                                        project_to_fetch['id'])
            except BehanceException as e:
                self.logger.error(
                    "Problem with Behance API. {0}".format(e))
                # error code 429 is given when you
                # have made too many API calls.
                # so you won't be making more
                if (e.error_code == 429):
                    return False

            add_project = False

            if self.to_fetch['tag'] == '*':
                add_project = True
            else:
                # this will enforce the tag being in there
                for tag in project_details['tags']:
                    if tag.lower() == self.to_fetch['tag']\
                                          .lower() or\
                       ''.join(tag.split(' ')).lower() ==\
                         ''.join(self.to_fetch['tag']
                                     .split(' ')).lower():
                        
                        add_project = True

            if add_project:
                project_to_fetch['details'] = project_details
                self.data['projects'].append(project_to_fetch)

        return True

    def format_data(self):
        self.data['formatted'] = list(self.data['projects'])
        for project in self.data['formatted']:
            project.pop('published_on', None)
            project.pop('stats', None)
            project.pop('privacy', None)
            project.pop('fields', None)
            project.pop('mature_access', None)
            project.pop('mature_content', None)
            project.pop('for_sale', None)
            project.pop('created_on', None)
            # project.pop('modified_on', None)
            project['owners'][0].pop('username', None)
            project['owners'][0].pop('city', None)
            project['owners'][0].pop('first_name', None)
            project['owners'][0].pop('last_name', None)
            project['owners'][0].pop('country', None)
            project['owners'][0].pop('state', None)
            project['owners'][0].pop('company', None)
            project['owners'][0].pop('created_on', None)
            project['owners'][0].pop('location', None)
            project['owners'][0].pop('fields', None)
            project['owners'][0].pop('images', None)
            project['owners'][0].pop('id', None)
            project['owners'][0].pop('occupation', None)
            project['details'].pop('short_url', None)
            project['details'].pop('mature_access', None)
            project['details'].pop('mature_content', None)
            project['details'].pop('created_on', None)
            project['details'].pop('published_on', None)
            project['details'].pop('stats', None)
            project['details'].pop('copyright', None)
            project['details'].pop('privacy', None)
            project['details'].pop('base_url', None)
            project['details'].pop('project_id', None)
            project['details'].pop('styles', None)
        return True
