import React, { useState, useEffect } from 'react';
import {user_logout} from '../redux/reducer/user/action';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const LogoutPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const history = useHistory();
    useEffect(() => {
        console.log(user);
        if (user.username) {
            dispatch(user_logout());
            history.replace('/signin')
        } else {
            history.replace('/');
        }
    }, [user]);
    return (
        <div>1</div>
    );
};

export default LogoutPage;
