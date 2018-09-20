from schema import Tables
from sqlalchemy import sql
from .util import options


def get(**kwargs):
    query = (
        sql.select([Tables.news, Tables.user.c.name])
           .select_from(Tables.news.join(Tables.user))
    )
    query = options.apply(query, **kwargs)
    return query
