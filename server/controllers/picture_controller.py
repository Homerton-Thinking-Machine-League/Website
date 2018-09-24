import json
import os
from services import picture_service
from flask import send_file

path_to_uploads = None

with open('config.json') as f:
    config = json.load(f)['server']
    path_to_uploads = config['pathToUploads']


def get_by_id(id):
    pic_path = picture_service.get_by_id(id)['path']
    _, extension = os.path.splitext(pic_path)

    mimetype_ext = ''
    if extension == '.jpg' or extension == '.jpeg':
        mimetype_ext = 'jpeg'
    elif extension == '.png':
        mimetype_ext = 'png'
    else:
        raise Exception('Unsupported file extension')

    full_path = os.path.join(path_to_uploads, pic_path)
    return send_file(full_path, mimetype='image/'+mimetype_ext)
