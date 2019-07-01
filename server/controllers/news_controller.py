from models import news_model
from flask import request, jsonify


def get():
    offset = request.args.get('offset')
    limit = request.args.get('limit')
    result = news_model.get_desc_time(offset=offset, limit=limit)
    return jsonify(result)
