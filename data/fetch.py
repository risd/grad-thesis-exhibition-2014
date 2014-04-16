import json
from fetch_behance import FetchBehance
from paginate import Paginate

if __name__ == '__main__':
    print "Fetching data from Behance."

    # students to gather
    all_students = [{
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
        }]

    test_students = [{
            'username': 'katherineporter',
            'program': 'Interior Studies',
        }]

    tag_to_filter = 'Grad Show 2014'
    test_tag_to_filter = '*'

    # get projects based on the students
    # passed in, and the tag to filter for
    fetch = FetchBehance({
        'students': test_students,
        'tag': test_tag_to_filter,
    }).fetch()

    # if we do not complete the fetch, don't write data
    if (fetch.complete_fetch):
        # otherwise, paginate the data for writing to files
        paginated = Paginate(fetch.data['projects'],
                             per_page=5.0).paginated

        count = 0
        for page in paginated:
            file_name = './data/projects_{0}.json'.format(count)
            with open(file_name, 'w') as projects:
                projects.write(json.dumps(page))
            count += 1
    else:
        print "Did not complete fetch. Not writing data."
