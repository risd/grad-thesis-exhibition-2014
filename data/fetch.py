from datetime import datetime
import logging
import json
from random import shuffle
import sys

from fetch_behance import FetchBehance
from paginate import Paginate

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - ' +\
                              '%(name)s - ' +\
                              '%(levelname)s - ' +\
                              '%(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

if __name__ == '__main__':
    logger.info("Fetching data from Behance.")


    # students to gather
    grads = [{
            'username': 'weichen',
            'program': 'Industrial Design',
        }, {
            'username': 'junhocjh',
            'program': 'Interior Architecture',
        }, {
            'username': 'SallyGales',
            'program': 'Interior Architecture',
        }, {
            'username': 'doreengarner',
            'program': 'Glass',
        }, {
            'username': 'juliegautierdownes',
            'program': 'Photography',
        }, {
            'username': 'Nayoung-Jeong',
            'program': 'Ceramics',
        }, {
            'username': 'teeshape',
            'program': 'Industrial Design',
        }, {
            'username': 'steven_pestana',
            'program': 'Digital + Media',
        }, {
            'username': 'jshih',
            'program': 'Digital + Media',
        }, {
            'username': 'Jordan_Taylor',
            'program': 'Ceramics',
        }, {
            'username': 'ttreuhaft',
            'program': 'Furniture',
        }, {
            'username': 'rmanson',
            'program': 'Painting',
        }]

    tag_to_filter = 'Grad Show 2014'
    test_tag_to_filter = '*'

    # grab into data
    bootstrap_file_path = './data/bootstrap.json'
    with open(bootstrap_file_path, 'r') as bootstrap_input_file:
        bootstrap_input = json.loads(bootstrap_input_file.read())

    if bootstrap_input['status']['completed']:
        # get projects based on the students
        # passed in, and the tag to filter for
        fetch =\
            FetchBehance(
                logger=logger,
                to_fetch={
                    'students': grads,
                    'tag': tag_to_filter,
                }
            ).fetch()
    else:
        fetch =\
            FetchBehance(
                logger=logger,
                to_fetch={
                    'students': grads,
                    'tag': tag_to_filter,
                },
                pick_up=bootstrap_input['status']['left_off'],
                data=bootstrap_input['data']
            ).fetch()

    # write data if we are done
    if (fetch.status['completed']):
        # shuffle the data
        fetched_data = fetch.data['formatted']
        shuffle(fetched_data)

        # otherwise, paginate the data for writing to files
        paginated = Paginate(fetched_data,
                             per_page=20.0).paginated

        count = 0
        metadata = {
            'pages': []
        }

        timestamp = datetime.now().strftime('%Y%m%d%H%M')

        for page in paginated:
            file_name =\
                'data/projects_{0}'.format(timestamp) +\
                '_{0}.json'.format(count)

            full_path = './{0}'.format(file_name)

            logger.info('Writing data: {0}'.format(file_name))

            with open(file_name, 'w') as projects:
                projects.write(json.dumps(page))

            metadata['pages'].append(file_name)
            count += 1

        # write out metadata for front end to find the
        # latest batch of files
        metadata_path = './data/metadata.json'
        logger.info('Writing metadata: {0}'.format(metadata_path))
        with open(metadata_path, 'w') as metadata_file:
            metadata_file.write(json.dumps(metadata))

        bootstrap_trail = {}
        bootstrap_trail['status'] = fetch.status
        bootstrap_trail['data'] = None

    else:
        # did not complete, write out where to pick up
        bootstrap_trail = {}
        bootstrap_trail['status'] = fetch.status
        bootstrap_trail['data'] = fetch.data

        logger.info("Did not complete fetch. Not writing data.")

    # write the bootstrap
    logger.info('Writing bootstrap trail: ' +\
                '{0}'.format(bootstrap_file_path))
    with open(bootstrap_file_path, 'w') as bootstrap_trail_file:
        bootstrap_trail_file.write(json.dumps(bootstrap_trail))
