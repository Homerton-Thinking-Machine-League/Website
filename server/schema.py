from sqlalchemy import inspect, Table
import db


class Tables:
    pass


inspector = inspect(db.engine)
for table_name in inspector.get_table_names():
    current_table = Table(table_name, db.metadata)
    inspector.reflecttable(current_table, None)
    setattr(Tables, table_name, current_table)
