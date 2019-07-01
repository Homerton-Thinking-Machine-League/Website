import db
from schema import Tables
from sqlalchemy import sql
from .util import to_dicts


def get_by_id(id):
    query = (
        sql.select([Tables.picture])
           .where(Tables.picture.c.id == id)
           .limit(1)
    )
    result = db.connection.execute(query)
    return to_dicts.one(result)
