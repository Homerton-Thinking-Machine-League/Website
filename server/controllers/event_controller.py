import json
from urllib import request, parse
from flask import jsonify

with open('config.json') as f:
    config = json.load(f)['facebook']
    access_token = config['accessToken']
    base_url = config['baseurl']


def get():
    params = parse.urlencode({
        'access_token': access_token,
        'fields': 'id'
    })
    url = base_url + '/me?' + params
    with request.urlopen(url) as f:
        id = json.load(f)['id']

    params = parse.urlencode({
        'access_token': access_token,
        'event_state_filter': ['published'],
        'time_filter': 'upcoming'
    })
    url = base_url + '/' + str(id) + '/events?' + params
    print(url)
    with request.urlopen(url) as f:
        data = json.load(f)['data']
    return jsonify(data)
