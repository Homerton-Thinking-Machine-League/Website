import json
from sqlalchemy import create_engine, MetaData


class Db():
    __connection = None
    __metadata = None
    __engine = None

    @staticmethod
    def connection():
        if Db.__connection is None:
            raise Exception('Database not initialised')
        return Db.__connection

    @staticmethod
    def metadata():
        if Db.__metadata is None:
            raise Exception('Database not initialised')
        return Db.__metadata

    
    @staticmethod
    def engine():
        if Db.__engine is None:
            raise Exception('Database not initialised')
        return Db.engine

    def __init__(self, config_file):
        if Db.__connection is not None:
            return
        with open(config_file) as f:
            config = json.load(f)["database"]
        Db.__engine = create_engine(
            "postgresql://"
            + config["username"] + ":" + config["password"]
            + "@" + config["host"] + ":" + str(config["port"])
            + "/" + config["database"]
        )
        Db.__connection = Db.__engine.connect()
        Db.__metadata = MetaData()
