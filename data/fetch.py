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

    # get projects based on the students
    # passed in, and the tag to filter for
    fetch =\
        FetchBehance(
            logger=logger,
            to_fetch={
                'students': grads,
                'tag': test_tag_to_filter,
            }
        ).fetch()

    fetched_data = fetch.data['formatted']
    shuffle(fetched_data)

    # if we do not complete the fetch, don't write data
    if (fetch.complete_fetch):
        # otherwise, paginate the data for writing to files
        paginated = Paginate(fetched_data,
                             per_page=20.0).paginated

        count = 0
        metadata = {
            'pages': []
        }

        timestamp = datetime.now().strftime('%Y%m%d')

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

        metadata_path = './data/metadata.json'
        logger.info('Writing metadata: {0}'.format(metadata_path))
        with open(metadata_path, 'w') as metadata_file:
            metadata_file.write(json.dumps(metadata))

    else:
        logger.info("Did not complete fetch. Not writing data.")
