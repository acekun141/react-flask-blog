import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {user_login} from '../redux/reducer/user/action';
import {useHistory} from 'react-router-dom';

const SigninPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [form, setForm] = useState({username: "", password: ""});
    const [error, setError] = useState("");
    const handleChange = (event) => {
        setForm(Object.assign({}, form, {
            [event.target.name]: event.target.value
        }));
    }
    const clearForm = () => {
        setForm({username: "", password: ""});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.username && form.password) {
            dispatch(user_login(form.username, form.password));
            if (!user.username) {
                setError("Username or Password not correct!");
                clearForm();
            }
        } else {
            setError("You should complete form");
        }
    }
    useEffect(() => {
        if (user.username) {
            history.replace("/");
        }
    }, [user])
    return (
        <div className="module-signin">
            <form className="form signin-form" onSubmit={(e) => handleSubmit(e)}>
                {error
                ? <p className="error">{error}</p>
                : null}
                <label>
                    Username
                    <input name="username"
                           value={form.username}
                           onChange={(e) => handleChange(e)}
                           required/>
                </label>
                <label>
                    Password
                    <input name="password"
                           type="password"
                           value={form.password}
                           onChange={(e) => handleChange(e)}
                           required/>
                </label>
                <button className="form-button" type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SigninPage;