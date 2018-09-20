from sqlalchemy import asc, desc


def apply(query, limit=None, offset=None,
          order_by=None, order_dir='ASC'):
    if limit is not None:
        query = query.limit(limit)
    if offset is not None:
        query = query.offset(offset)
    if order_by is not None:
        ordering = asc if order_dir.upper() == 'ASC' else desc
        query = query.order_by(ordering(order_by))
    return query
