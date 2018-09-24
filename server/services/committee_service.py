import db
from schema import Tables
from repositories import committee_repository
from .util import to_dicts


def get():
    query = committee_repository.get(
        order_by=Tables.committee.c.sorting_priority,
        order_dir='ASC'
    )
    result = db.connection.execute(query)
    return to_dicts.all(result, transform={
        'picture':
            lambda pic: '' if pic is None else '/api/pictures/' + str(pic)
    })
