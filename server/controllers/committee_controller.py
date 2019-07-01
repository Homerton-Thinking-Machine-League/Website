from models import committee_model
from flask import jsonify


def get():
    result = committee_model.get()
    return jsonify(result)
