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
    grads = [
	
		{
            'username': 'david_aipperspach',
            'program': 'Painting',
			 'personal': 'http://davidaipperspach.com/',
        },{
			 'username': 'SwordofChaos',
            'program': 'Landscape Architecture',
			 'personal': '',
        },{
			 'username': 'katebell',
            'program': 'Jewelry + Metalsmithing',
			 'personal': 'http://kate-bell.com/',
        },{
			 'username': 'MassiveCombination',
            'program': 'Interior Architecture',
			 'personal': '',
		},{
			 'username': 'MassiveCombination',
            'program': 'Interior Architecture',
			 'personal': '',
		},{	 	 
			 'username': 'weichen',
            'program': 'Industrial Design',
			 'personal': 'http://weichendesign.com',
        }, {
			'username': 'junhocjh',
           'program': 'Interior Architecture',
			'personal':'http://www.junhochoi.com',
        }, {
			'username': 'ranheechung',
           'program': 'Industrial Design',
			'personal':'http://www.ranheechung.com',
		}, {
			'username': 'jiangliu-dong',
           'program': 'Jewelry + Metalsmithing',
			'personal':'',	
		}, {
           'username': 'SallyGales',
           'program': 'Interior Architecture',
			'personal':'http://sally-gales.squarespace.com',	
        }, {
			'username': 'doreengarner',
            'program': 'Glass',
			'personal':'http://www.doreengarner.com',
        }, {
			'username': 'juliegautierdownes',
            'program': 'Photography',
			'personal':'http://www.juliegautierdownes.com',
        }, {
			'username': 'vanessagodden',
            'program': 'Photography',
			'personal':'http://vanessagodden.com/',
		}, {
			'username': 'Nayoung-Jeong',
            'program': 'Ceramics',
			'personal':'http://www.nayoungjeong.com',
        }, {
			'username': 'forestkelley',
            'program': 'Photography',
			'personal':'http://forestkelley.net',
		}, {
			'username': 'eunsong',
            'program': 'Interior Architecture',
			'personal':'',
		}, {
			'username': 'teeshape',
            'program': 'Industrial Design',
			'personal':'',	
		}, {
			'username': 'wangui',
            'program': 'Printmaking',
			'personal':'http://wanguimaina.tumblr.com/',	
		}, {
			'username': 'tmishima9b37',
            'program': 'Painting',
			'personal':'http://tommymishimastudio.com/',	
		}, {
			'username': 'sophia_narrett',
            'program': 'Painting',
			'personal':'http://www.sophianarrett.com/',	
		}, {
			'username': 'davidngene',
            'program': 'Industrial Design',
			'personal':'http://www.linkedin.com/in/davidngene',	
		}, {
			'username': 'nckpnny',
            'program': 'Digital + Media',
			'personal':'http://www.nckpnny.com/',		
		}, {
			'username': 'steven_pestana',
            'program': 'Digital + Media',
			'personal':'http://www.stevenpestana.com',							
		}, {
			'username': 'apexaa1ba',
            'program': 'Glass',
			'personal':'http://aaronpexa.com/',
		}, {
			'username': 'jshih',
            'program': 'Digital + Media',
			'personal':'http://moriandyama.com/',
		}, {
			'username': 'Jordan_Taylor',
            'program': 'Ceramics',
			'personal':'http://cargocollective.com/Jordan_Taylor',	
		}, {
			'username': 'ttreuhaft',
            'program': 'Furniture',
			'personal':'http://www.teshiatreuhaft.com',	
		}, {
			'username': 'diana_wagner',
            'program': 'Industrial Design',
			'personal':'http://www.dianawagner.com/',		
		}, {
			'username': 'gefengwang',
           'program': 'Digital + Media',
			'personal':'http://www.gefengwang.com/',	
		}, {
			'username': 'ReesaWood',
           'program': 'Painting',
			'personal':'http://www.reesawood.com',
		}, {
			'username': 'awoolbri0877',
           'program': 'Painting',
			'personal':'http://www.andrewwoolbright.com/',	
		}, {
			'username': 'chihaoyo',
           'program': 'Digital + Media',
			'personal':'http://chihaoyo.me/portfolio/',	
		}, {
			'username': 'lehu',
           'program': 'Graphic Design',
			'personal':'http://www.lehuzhang.com/',						
		}, {
			'username': 'jingzuo',
           'program': 'Interior Architecture',
			'personal':'http://cargocollective.com/jzuocc',	
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
