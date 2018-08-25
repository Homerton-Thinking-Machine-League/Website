import os
from flask import Flask, send_from_directory, send_file, redirect, request, abort, json
import db
import sqlalchemy as sa
import json

db.init('config.json')
metadata = sa.MetaData();

posts_table = sa.Table('posts',
    metadata,
    sa.Column('id', sa.INTEGER, primary_key=True),
    sa.Column('author_id', sa.INTEGER, sa.ForeignKey('users.id'), nullable=False),
    sa.Column('time', sa.TIMESTAMP(timezone=True)),
    sa.Column('text', sa.TEXT)
)

users_table = sa.Table('users',
    metadata,
    sa.Column('id', sa.INTEGER, primary_key=True),
    sa.Column('name', sa.VARCHAR(255), nullable=False),
    sa.Column('role_id', sa.INTEGER, sa.ForeignKey('roles.id'), nullable=False)
)

app = Flask(__name__, static_folder="../build/")
with open("config.json") as f:
    config = json.load(f)["server"]

@app.route('/api/committee')
def get_committee():
    picture = request.args.get('picture')
    if picture is not None:
        if os.path.exists("./data/committee_photos/" + picture):
            return send_from_directory("./data/committee_photos/", picture), 200
        return "No pics :-(", 404
    return send_file("./data/committee.json"), 200

@app.route('/api/news')
def get_news():
    offset = request.args.get('offset') or 0
    limit = request.args.get('limit') or 1
    
    query = (sa.sql.select([posts_table.c.id, users_table.c.name, posts_table.c.time, posts_table.c.text])
        .select_from(users_table.join(posts_table))
        .order_by(sa.desc(posts_table.c.time))
        .limit(limit)
        .offset(offset)
    )
    result = db.connection.execute(query)
    obj = [{"id": id, "author": author, "time": str(time), "text": text} for id, author, time, text in result]
    return json.dumps(obj)

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
