import React from 'react';
import {useDispatch} from 'react-redux';
import {toggleTodo__server} from '../redux/reducer/todos/action';

const Todo = (props) => {
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch(toggleTodo__server(props.todo.id));
    }
    return (
        <div className="todo">
            <div className="todo-is_complete">
                <button onClick={() => handleToggle()} className={`${props.todo.is_complete}`}>{`${props.todo.is_complete}`}</button>
            </div>
            <div className="todo-name">
                <p>{props.todo.name}</p>
            </div>
            <div className="todo-button">
                <button className="todo-show" onClick={() => props.show(props.todo)}>Show</button>
            </div>
        </div>
    );
};

export default Todo;