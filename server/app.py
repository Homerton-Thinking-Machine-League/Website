import os
from flask import Flask, send_from_directory
from controllers import (
    news_controller, committee_controller
)

app = Flask(__name__, static_folder="../build/")


app.route('/api/committee', endpoint='get_committee', methods=['GET'])(
    committee_controller.get
)

app.route('/api/news', endpoint='get_news', methods=['GET'])(
    news_controller.get
)


@app.route('/api/<path:path>')
def unknown_api_endpoint(path):
    return "Unknown endpoint /api/" + path, 404


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    react_app_folder = "../build/"
    if path == "" or not os.path.exists(react_app_folder + path):
        return send_from_directory(react_app_folder, 'index.html')
    return send_from_directory(react_app_folder, path)
