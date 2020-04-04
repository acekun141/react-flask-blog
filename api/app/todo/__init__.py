from flask import Blueprint

todo = Blueprint(name='todo',
                 import_name=__name__,
                 url_prefix='/todo')


from app.todo import routes, models