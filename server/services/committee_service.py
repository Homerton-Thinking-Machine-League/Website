import db
from base64 import b64encode
from schema import Tables
from repositories import committee_repository
from .util import to_dict_list


def get():
    query = committee_repository.get(
        order_by=Tables.committee.c.sorting_priority,
        order_dir='ASC'
    )
    result = db.connection.execute(query)
    return to_dict_list.all(result, transform={
        'picture': lambda pic: b64encode(pic)
    })
