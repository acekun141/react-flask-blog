import {USER_LOGIN, USER_LOGOUT, USER_SIGNUP, GET_USER} from './actionTypes';

export const user_login = (username, password) => async (dispatch) => {
    try {
        const response = await fetch('/auth/user/', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            }
        });
        const data = await response.json();
        if (data.token) {
            return dispatch({
                type: USER_LOGIN,
                payload: data.token 
            });
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
};

export const user_signup = async (username, password) => {
    try {
        const response = await fetch('/auth/user/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        });
        const data = await response.json();
        return data;
    } catch(error) {
        return false;
    }
};

export const user_logout = () => dispatch => {
    return dispatch({
        type: USER_LOGOUT
    });
};

export const get_user = () => dispatch => {
    return dispatch({
        type: GET_USER
    })
}