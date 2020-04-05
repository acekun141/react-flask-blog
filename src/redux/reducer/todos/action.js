import {GET_TODO, ADD_TODO, REMOVE_TODO, EDIT_TODO, TOGGLE_TODO} from './actionTypes';

export const getTodo__server = () => async dispatch => {
    try {
        const response = await fetch('/todo/', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        if (data) {
            return dispatch({
                type: GET_TODO,
                payload: data.todos
            })
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
};


export const addTodo__server = (todo) => async dispatch => {
    try {
        const response = await fetch('/todo/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(todo)
        });
        const result = await response.json();
        if (result.message) {
            return dispatch({
                type: ADD_TODO,
                payload: result.todo
            });
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
};


export const editTodo__server = (todo) => async dispatch => {
    console.log(todo);
    try {
        const response = await fetch(`/todo/${todo.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(todo)
        });
        const result = await response.json();
        if (result.message) {
            return dispatch({
                type: EDIT_TODO,
                payload: todo
            });
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
};


export const toggleTodo__server = (id) => async dispatch => {
    try {
        const response = await fetch(`/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        });
        const result = await response.json();
        if (result.message) {
            return dispatch({
                type: TOGGLE_TODO,
                payload: id
            });
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
};


export const removeTodo__server = (id) => async dispatch => {
    try {
        const response = await fetch(`/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        });
        const result = await response.json();
        if (result.message) {
            return dispatch({
                type: REMOVE_TODO,
                payload: id
            });
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
};