from services import news_service


def get(request):
    offset = request.args.get('offset')
    limit = request.args.get('limit')
    result = news_service.get_desc_time(offset=offset, limit=limit)
    return result
