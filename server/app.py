import os
from flask import Flask, send_from_directory

react_app_folder = "../build/"
app = Flask(__name__, static_folder=react_app_folder)

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(react_app_folder + path):
        return send_from_directory(react_app_folder, path)
    else:
        return send_from_directory(react_app_folder, 'index.html')