from datetime import datetime
import logging
import json
from random import shuffle
import os
import sys

from fetch_behance import FetchBehance
from paginate import Paginate

import boto
from boto.s3.key import Key


def env_var(key, default=None):
    """Retrieves env vars and makes Python boolean replacements"""
    val = os.environ.get(key, default)
    if val == 'True':
        val = True
    elif val == 'False':
        val = False
    return val


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


AWS_KEY = env_var('AWS_KEY')
AWS_SECRET_KEY = env_var('AWS_SECRET_KEY')

s3 = boto.connect_s3(AWS_KEY, AWS_SECRET_KEY)
bucket = s3.get_bucket('risdgradshow2014')

if __name__ == '__main__':
    logger.info("Fetching data from Behance.")


    # students to gather
    grads = []
    with open('./data/grads.json', 'r') as grads_file:
        grads = json.loads(grads_file.read())

    tag_to_filter = 'Grad Show 2014'
    test_tag_to_filter = '*'

    # grab into data
    bootstrap_input = {
        'status': {
            'completed': True
        }
    }
    logger.info('Reading bootstrap file.')
    k = Key(bucket)
    bootstrap_file_path = 'data/bootstrap.json'
    k.key = bootstrap_file_path
    try:
        bootstrap_input = json.loads(k.get_contents_as_string())
    except:
        logger.info('No bootstrap file, continuing.')

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
            k.key = 'data/projects_{0}'.format(timestamp) +\
                    '_{0}.json'.format(count)

            logger.info('Writing data: {0}'.format(k.key))
            k.set_contents_from_string(json.dumps(page))

            metadata['pages']\
                .append(
                    k.generate_url(
                        expires_in=0, query_auth=False))
            count += 1

        # write out metadata for front end to find the
        # latest batch of files
        logger.info('Writing metadata: {0}'.format(k.key))
        k.key = 'data/metadata.json'
        k.set_contents_from_string(json.dumps(metadata))

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
    k.key = bootstrap_file_path
    k.set_contents_from_string(json.dumps(bootstrap_trail))

    logger.info('Completed.')
