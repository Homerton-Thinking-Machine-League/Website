import db
from repositories import picture_repository
from .util import to_dicts


def get_by_id(id):
    query = picture_repository.get_by_id(id)
    result = db.connection.execute(query)
    return to_dicts.one(result)
