import os
from flask import Flask, send_from_directory, send_file, redirect, request, abort
import db

app = Flask(__name__, static_folder="../build/")
db.init('dbconf.json')

@app.route('/api/committee')
def get_committee():
    picture = request.args.get('picture');
    if picture is not None:
        if os.path.exists("./data/committee_photos/" + picture):
            return send_from_directory("./data/committee_photos/", picture), 200
        return "No pics :-(", 404
    return send_file("./data/committee.json"), 200

@app.route('/api/<path:path>')
def unknown_api_endpoint(path):
    return "Unknown endpoint /api/" + path, 404

# Serve React App
react_app_folder = "../build/"
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path == "" or not os.path.exists(react_app_folder + path):
        return send_from_directory(react_app_folder, 'index.html')
    return send_from_directory(react_app_folder, path)
        