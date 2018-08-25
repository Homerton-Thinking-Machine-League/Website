import json
from sqlalchemy import create_engine

connection = None

def init(config_file):
    global connection
    if connection is not None:
        return
    with open(config_file) as f:
        config = json.load(f)["database"]
    engine = create_engine(
        "mysql+pymysql://"
        + config["username"] + ":" + config["password"]
        + "@" + config["host"] + ":" + str(config["port"])
        + "/" + config["database"]
    )
    connection = engine.connect()