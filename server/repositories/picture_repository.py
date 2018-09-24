from schema import Tables
from sqlalchemy import sql
from typing import Union


def get_by_ids(ids: Union[list, sql.selectable.Select]):
    query = (
        sql.select([Tables.picture])
           .where(Tables.picture.c.id.in_(ids))
    )
    return query


def get_by_id(id):
    return get_by_ids([id]).limit(1)
