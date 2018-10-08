import cgitb
from wsgiref.handlers import CGIHandler
from app import app
cgitb.enable()
CGIHandler().run(app)
