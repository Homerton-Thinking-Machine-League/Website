import json
from sqlalchemy import create_engine, MetaData

connection = None
metadata = None
engine = None

with open('config.json') as f:
    config = json.load(f)["database"]

    use_password = "username" in config and config["username"] != ""

    engine_url = "postgresql://"
    if use_password:
        engine_url += config["username"] + ":" + config["password"] + "@"
    engine_url += config["host"]
    if "port" in config and config["port"] >= 0:
        engine_url += ":" + str(config["port"])
    engine_url += "/" + config["database"]

    engine = create_engine(engine_url)
    connection = engine.connect()
    metadata = MetaData(bind=engine)
