import json
from sqlalchemy import create_engine, MetaData

connection = None
metadata = None
engine = None

with open('config.json') as f:
    config = json.load(f)["database"]
    engine = create_engine(
        "postgresql://"
        + config["username"] + ":" + config["password"]
        + "@" + config["host"] + ":" + str(config["port"])
        + "/" + config["database"]
    )
    connection = engine.connect()
    metadata = MetaData(bind=engine)
