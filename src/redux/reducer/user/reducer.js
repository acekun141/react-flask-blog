import {USER_SIGNUP, USER_LOGOUT, USER_LOGIN, GET_USER} from './actionTypes';

const initialState = {};

export default function(state=initialState, action) {
    switch(action.type) {
        case USER_LOGIN:
            localStorage.setItem('token', action.payload);
            const user_data = action.payload.split(".")[1];
            const user = atob(user_data);
            const user_obj = JSON.parse(user);
            return user_obj; 
        case USER_LOGOUT:
            localStorage.clear();
            return {};
        case GET_USER:
            const token = localStorage.getItem('token');
            try {
                const user_token = token.split(".")[1];
                const user_str = atob(user_token);
                const user_get = JSON.parse(user_str);
                if (user_get.username) {
                    return user_get;
                } else {
                    return {};
                }
            } catch(error) {
                return {};
            }
        default:
            return state
    };
}