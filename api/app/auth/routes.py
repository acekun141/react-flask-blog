from flask import request, jsonify, current_app
from app import db
from app.auth import auth as blueprint
from flask.views import MethodView
from app.auth.models import User
from functools import wraps
import uuid
import jwt
import datetime
import time


def login_required(admin=False):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            header = request.headers
            token = header.get('x-access-token', None)
            if token:
                try:
                    user_data = jwt.decode(token,
                                        current_app.config['SECRET_KEY'])
                    user = User.query.filter_by(username=user_data['username']).first()
                    if user_data['exp'] < time.time():
                        return jsonify({'error': 'Token is out of date!'}), 401
                    if admin and user.is_admin:
                        return jsonify({'error': 'Forbidden'}), 403

                except Exception as value:
                    return jsonify({'error': 'Invalid input'}), 406

            return func(current_user=user, *args, **kwargs)
        
        return wrapper
    
    return decorator


class SignInUpAPI(MethodView):

    def get(self):
        auth = request.authorization
        try:
            username = auth.username
            password = auth.password
            user = User.query.filter_by(username=username).first()

            if user:
                if user.check_password(password):
                    payload = {'username': user.username,
                               'public_id': user.public_id,
                               'exp': datetime.datetime.utcnow()
                                      + datetime.timedelta(days=30)}
                    token = jwt.encode(payload,
                                       current_app.config['SECRET_KEY'])
                    
                    return jsonify({'mesasge': 'successful!',
                                    'token': token.decode('utf-8')})

            raise Exception('Cannot authorization')

        except Exception as value:
            return jsonify({'error': 'Cannot authorization'}), 401

    def post(self):
        try:
            data = request.get_json()
            print(data)
            username = data.get('username', None)
            password = data.get('password', None)

            if username and password:
                user = User.query.filter_by(username=username).first()
                if user:
                    return jsonify({'error': 'username has already been registered!'})
                else:
                    new_user = User()
                    new_user.username = username
                    new_user.set_password(password)
                    new_user.public_id = str(uuid.uuid4())
                    new_user.is_admin = False

                    db.session.add(new_user)
                    db.session.commit()

                    return jsonify({'message': 'Successful!'})
            
            raise Exception('Invalid input')
        except Exception as value:
            return jsonify({'error': 'Invalid input'}), 406

blueprint.add_url_rule(rule='/user/',
                       view_func=SignInUpAPI.as_view('sign_in_up'))


class AdminAuthAPI(MethodView):
    
    @login_required(admin=True)
    def delete(self, current_user, public_id):
        user = User.query.filter_by(public_id=public_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            return jsonify({'message': 'Successful!'})
        
        else:
            return jsonify({'message': 'User not found!'}), 404

blueprint.add_url_rule(rule='/user/<public_id>',
                       view_func=AdminAuthAPI.as_view('admin_auth'))
