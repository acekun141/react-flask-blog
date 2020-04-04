from app import db


class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True, nullable=False)
    content = db.Column(db.Text, index=True, nullable=True)
    is_complete = db.Column(db.Boolean)
    user_id = db.Column(db.String(36), nullable=False)

    def __repr__(self):
        return '<Todo {0}-{1}>'.format(self.id, self.name)
    
    def to_dict(self):
        todo_data = {}
        todo_data['id'] = self.id
        todo_data['name'] = self.name
        todo_data['content'] = self.content
        todo_data['is_complete'] = self.is_complete
        todo_data['user_id'] = self.user_id

        return todo_data

