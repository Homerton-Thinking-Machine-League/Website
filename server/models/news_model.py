import db
from schema import Tables
from sqlalchemy import sql
from .util import to_dicts, options


def get_desc_time(**kwargs):
    query = (
        sql.select([Tables.news, Tables.user.c.name])
           .select_from(Tables.news.join(Tables.user))
    )
    query = options.apply(query,
        order_by=Tables.news.c.time,
        order_dir='DESC',
        **kwargs
    )

    result = db.connection.execute(query)
    return to_dicts.all(result, transform={
        'time': lambda t: str(t)
    })
