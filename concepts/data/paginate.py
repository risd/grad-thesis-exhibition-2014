import math


class Paginate():
    """
    Takes a list and splits it up
    into a series of smaller lists.
    """
    def __init__(self, original_data, per_page=20.0):
        self.original_data = original_data
        self.per_page = per_page
        self.paginated = []
        self.paginate()
    
    def paginate(self):
        total_pages = math.ceil(len(self.original_data) /
                                self.per_page)
        for page_number in range(0, int(total_pages)):
            cur_page = {
                'meta': {
                    # current index, start from 0
                    'page_number': int(page_number),
                    # if pages were an array,
                    # this would be the length
                    'total_pages': int(total_pages),
                },
                'objects': self.original_data[
                    int(self.per_page * page_number):
                    int(self.per_page * page_number + self.per_page)]
            }

            self.paginated.append(cur_page)

        return self
