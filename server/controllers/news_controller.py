from services import news_service
from flask import request, jsonify


def get():
    offset = request.args.get('offset')
    limit = request.args.get('limit')
    result = news_service.get_desc_time(offset=offset, limit=limit)
    return jsonify(result)
