import db
from schema import Tables
from .util import to_dicts, options
from sqlalchemy import sql

def get():
    query = (
        sql.select([
            Tables.committee.c.id, Tables.committee.c.position,
            Tables.committee.c.email, Tables.user.c.name,
            Tables.picture.c.id.label('picture')
        ]).select_from(
            Tables.committee.join(Tables.user).outerjoin(Tables.picture)
        )
    )
    query = options.apply(query,
        order_by=Tables.committee.c.sorting_priority,
        order_dir='ASC'
    )

    result = db.connection.execute(query)
    return to_dicts.all(result, transform={
        'picture':
            lambda pic: '' if pic is None else '/pictures/' + str(pic)
    })
