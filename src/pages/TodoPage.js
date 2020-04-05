import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FormTodo from '../components/FormTodo';
import Todo from '../components/Todo';
import {getTodo__server} from '../redux/reducer/todos/action';
import {useHistory} from 'react-router-dom';

const TodoPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showTodo, setShowTodo] = useState(0);
    const todos = useSelector(state => state.todos);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user.username) {
            history.replace('/signin');
        }
    }, [user])

    useEffect(() => {
        dispatch(getTodo__server());
    }, []);

    return (
        <div className="module-todopage">
            <div className="all-todo">
                <div className="todo">
                    <p><b>Todo</b></p>
                    {todos.map(todo => {
                        if (!todo.is_complete) {
                            return ( <Todo key={todo.id} todo={todo} show={setShowTodo} />
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="todo-complete">
                    <p><b>Complete</b></p>
                    {todos.map(todo => {
                        if (todo.is_complete) {
                            return (
                                <Todo key={todo.id} todo={todo} show={setShowTodo} />
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
            <div className="todo-detail">
                {showTodo
                ? <FormTodo todo={showTodo} close={setShowTodo}/>
                : <button className="add-todo" onClick={() => setShowTodo(1)}>Add Todo</button>}
            </div>
        </div>
    );
};

export default TodoPage;