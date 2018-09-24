import db
from schema import Tables
from repositories import news_repository
from .util import to_dicts


def get_desc_time(**kwargs):
    query = news_repository.get(
        order_by=Tables.news.c.time,
        order_dir='DESC',
        **kwargs
    )
    result = db.connection.execute(query)
    return to_dicts.all(result, transform={
        'time': lambda t: str(t)
    })
