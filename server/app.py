from os.path import normpath
from flask import Flask, send_from_directory
from controllers import (
    news_controller, committee_controller, picture_controller
)

app = Flask(__name__, static_folder="../build/")


app.route('/api/committee', endpoint='get_committee', methods=['GET'])(
    committee_controller.get
)

app.route('/api/news', endpoint='get_news', methods=['GET'])(
    news_controller.get
)

app.route('/pictures/<int:id>', endpoint='get_picture_by_id', methods=['GET'])(
    picture_controller.get_by_id
)


@app.route('/api/<path:path>')
def unknown_api_endpoint(path):
    return "Unknown endpoint /api/" + path, 404


@app.route('/static/<path:path>')
def send_static_content(path):
    return send_from_directory(normpath(app.static_folder + '/static/'), path)


# Serve React App
@app.route('/')
def serve_react_app():
    return app.send_static_file('index.html')
