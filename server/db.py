import json
from sqlalchemy import create_engine

connection = None

def init(config_file):
    global connection
    if connection is not None:
        print("Detected database reinitialisation")
        return
    with open(config_file) as f:
        config = json.load(f)
    engine = create_engine(
        "mysql+pymysql://"
        + config["username"] + ":" + config["password"]
        + "@" + config["host"] + ":" + str(config["port"])
        + "/" + config["db_name"]
    )
    connection = engine.connect()
    print("Connected to the database")