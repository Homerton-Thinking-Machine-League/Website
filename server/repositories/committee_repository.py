from schema import Tables
from sqlalchemy import sql
from .util import options


def get(**kwargs):
    query = (
        sql.select([
            Tables.committee.c.id, Tables.committee.c.position,
            Tables.committee.c.email, Tables.user.c.name,
            Tables.picture.c.path
        ]).select_from(
            Tables.committee.join(Tables.user).join(Tables.picture)
        )
    )
    query = options.apply(query, **kwargs)
    return query
