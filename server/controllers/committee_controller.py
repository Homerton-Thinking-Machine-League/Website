from services import committee_service
from flask import jsonify


def get():
    result = committee_service.get()
    return jsonify(result)
