from app.todo import todo as blueprint
from flask import request, jsonify
from flask.views import MethodView
from app import db
from app.todo.models import Todo
from app.auth.routes import login_required


class TodoAPI(MethodView):

    @login_required()
    def get(self, current_user):
        """Get all Todo"""
        todos = Todo.query.filter_by(user_id=current_user.public_id).all()
        output = []
        for todo in todos:
            output.append(todo.to_dict())

        return jsonify({'todos': output})

    @login_required()
    def post(self, current_user):
        """Create new todo"""
        try:
            data = request.get_json()
            name = data.get('name', None)
            content = data.get('content', None)
            if name:
                new_todo = Todo()
                new_todo.name = name
                new_todo.content = content
                new_todo.user_id = current_user.public_id
                new_todo.is_complete = False

                db.session.add(new_todo)
                db.session.commit()

                return jsonify({'message': 'Successful!', 'todo': new_todo.to_dict()})
            
            else:
                
                return jsonify({'error': 'Name cannot empty'}), 406
        except Exception as value:

            return jsonify({'error': 'Something went wrong'}), 404

blueprint.add_url_rule(rule='/',
                       view_func=TodoAPI.as_view('todo_api'))


class TodoDetailAPI(MethodView):

    @login_required()
    def get(self, current_user, todo_id):
        todo = Todo.query.filter_by(id=todo_id,
                user_id=current_user.public_id).first()
        if not todo:
            return jsonify({'error': 'Todo not fould!'})
        else:
            return jsonify({'todo': todo.to_dict()})
    
    @login_required()
    def post(self, current_user, todo_id):
        todo = Todo.query.filter_by(id=todo_id,
                user_id=current_user.public_id).first()
        if not todo:
            return jsonify({'error': 'Todo not fould!'})
        else:
            data = request.get_json()
            name = data.get('name', None)
            content = data.get('content', None)
            if not name:
                return jsonify({'error': 'Name cannot empty!'})
            else:
                todo.name = name
                todo.content = content

                db.session.commit()

                return jsonify({'message': 'successful!'})
    

    @login_required()
    def put(self, current_user, todo_id):
        todo = Todo.query.filter_by(id=todo_id,
                user_id=current_user.public_id).first()
        if not todo:
            return jsonify({'error': 'Todo not fould!'})
        else:
            todo.is_complete = not todo.is_complete
            
            db.session.commit()

            return jsonify({'message': 'successful!'})


    @login_required()
    def delete(self, current_user, todo_id):
        todo = Todo.query.filter_by(id=todo_id,
                user_id=current_user.public_id).first()
        if not todo:
            return jsonify({'error': 'Todo not fould!'})
        else:
            db.session.delete(todo)
            db.session.commit()

            return jsonify({'message': 'successful!'})

blueprint.add_url_rule(rule='/<todo_id>',
                       view_func=TodoDetailAPI.as_view('todo_detail_api'))               
