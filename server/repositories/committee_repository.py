from schema import Tables
from sqlalchemy import sql


def get():
    query = (
        sql.select(['*'])
           .select_from(Tables.committee)
    )
    return query
