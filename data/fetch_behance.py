from behance_python.api import API
from behance_python.user import User
from behance_python.exceptions import BehanceException


public_key = "sGRp891umgwx4IT318rFcueQcjmr9bt3"
behance = API(public_key)

# User calls _get_user_details on __init__.
# This makes a call to the API, that we don't
# need to make, since we aren't using any of
# that information, we are setting
# _get_user_details to noop
def noop(self):
    pass
setattr(User, '_get_user_details', noop)


class FetchBehance():
    """docstring for FetchBehance"""
    def __init__(self,
                 logger,
                 to_fetch={ 'students': [], 'tag': '', },
                 pick_up={ 'dataset': None, 'value': None },
                 data={ 'projects':[],
                        'temp_projects':[],
                        'formatted':[] }):

        # list of usernames and departments to gather
        self.to_fetch = to_fetch

        # structure of the data used internally
        self.data = data

        # used to manage bootstrap of scripts
        self.pick_up = pick_up

        # used to manage exit of script
        self.status = {
            'completed': False,
            'left_off': {
                # which dataset were we in?
                # user, projects, details
                'dataset': None,
                # where do we pick up?
                'value': None,
            },
        }

        # log all the things
        self.logger = logger

    def fetch(self):
        self.status['completed'] = False

        # boot strap
        if self.pick_up['dataset'] == 'details':
            projects_fetched = {
                'completed': True,
                'left_off': None,
            }
            details_fetched = self.fetch_project_details(
                pick_up_from=self.pick_up['value'])

        elif self.pick_up['dataset'] == 'projects':
            projects_fetched = self.fetch_projects(
                pick_up_from=self.pick_up['value'])

        else:
            projects_fetched = self.fetch_projects()
            details_fetched = self.fetch_project_details()


        # leave trail for boot strapping
        if projects_fetched['completed'] and\
           details_fetched['completed']:

            self.status['completed'] = True
            self.status['left_off'] = {
                'dataset': None,
                'value': None,
            }
            self.format_data()

        elif projects_fetched['completed']:

            self.status['completed'] = False
            self.status['left_off'] = {
                'dataset': 'details',
                'value': details_fetched['left_off'],
            }

        else:
            self.status['completed'] = False
            self.status['left_off'] = {
                'dataset': 'projects',
                'value': projects_fetched['left_off'],
            }

        return self


    def fetch_projects(self, pick_up_from=None):
        self.logger.info('Fetching Projects')

        for student in self.to_fetch['students']:

            # if there is a value to pick up from
            # start looking for it.
            if pick_up_from:
                if student['username'] == pick_up_from:
                    # when the user is found
                    # remove the flag to find them
                    pick_up_from = None
                else:
                    # otherwise, continue
                    # looking for the user
                    continue

            try:
                # get all projects with our tag of interest
                projects =\
                    behance.project_search(student['username'],
                                           tags=self.to_fetch['tag'])

            except BehanceException as e:
                self.logger.error(
                    "Problem with Behance API. {0}".format(e))
                # error code 429 is given when you
                # have made too many API calls.
                # so you won't be making more
                if (e.error_code == 429):
                    return {
                        'completed': False,
                        'left_off': student['username'],
                    }

            for project in projects:
                to_include = False

                # check to see if project is done by a student
                # whose username we are searching for
                for key in project['owners']:
                    username = project['owners'][key]['username']

                    for student in self.to_fetch['students']:
                        if username == student['username']:
                            to_include = True

                if to_include:
                    project['risd_program'] = student['program']
                    project['personal_link'] = student['personal']
                    self.data['temp_projects'].append(project)

        return {
            'completed': True,
            'left_off': None,
        }

    def fetch_project_details(self, pick_up_from=None):
        self.logger.info('Fetching Details')

        for project_to_fetch in self.data['temp_projects']:

            # if there is a user to pick up on
            # start looking for it
            if pick_up_from:
                # when you find it, set pick_up_from
                # to None, to invalidate this statement
                if project_to_fetch['id'] == pick_up_from:
                    pick_up_from = None
                else:
                    # otherwise, continue looking for
                    # the user
                    continue

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
                    return {
                        'completed': False,
                        'left_off': project_to_fetch['id'],
                    }

            # add project details into the mix
            project_to_fetch['details'] = project_details
            self.data['projects'].append(project_to_fetch)

        return {
            'completed': True,
            'left_off': None,
        }

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

    def tag_mutations(self, tag):
        mutated = tag
        mutated += '|{0}'.format(tag.lower())
        mutated += '|{0}'.format(''.join(tag.split(' ')))
        mutated += '|{0}'.format(''.join(tag.split(' ')).lower())
        return mutated
