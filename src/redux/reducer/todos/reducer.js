import {ADD_TODO, REMOVE_TODO, EDIT_TODO, TOGGLE_TODO, GET_TODO} from './actionTypes';

let initialState = [];

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_TODO:
            return action.payload;
        case ADD_TODO:
            return [...state, action.payload];
        case EDIT_TODO:
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return Object.assign({}, todo, action.payload);
                } else {
                    return todo;
                }
            });
        case TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id === action.payload) {
                    return Object.assign({}, todo, {is_complete: !todo.is_complete});
                } else {
                    return todo;
                }
            });
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    };
};