import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {user_signup} from '../redux/reducer/user/action';
import {useHistory} from 'react-router-dom';

const SignupPage = () => {
    const user = useSelector(state => state.user);
    const history = useHistory();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        username: "",
        password: "",
        re_password: ""
    });

    useEffect(() => {
        if (user.username) {
            history.replace("/");
        }
    }, [user])
    
    const clearForm = () => {
        setForm({
            username: "",
            password: "",
            re_password: ""
        });
    };

    const handleChange = (event) => {
        setForm(Object.assign({}, form, {
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.username && form.password && form.re_password) {
            if (form.password !== form.re_password) {
                setError("Confirm password not correct!")
                clearForm();
            } else {
                const result = await user_signup(form.username, form.password);
                if (result.message) {
                    history.replace("/signin");
                } else if (result.error) {
                    setError(result.error);
                    clearForm();
                } else {
                    setError("Something wrong. Try it later!");
                    clearForm();
                }
            }
        } else {
            setError("Please complete form!");
        }
    };

    return (
        <div className="module-signup">
            <form className="form form-signup" onSubmit={(e) => handleSubmit(e)}>
                {error
                ? <p className="error">{error}</p>
                : null}
                <label>
                    Username
                    <input name="username"
                           placeholder="Username"
                           onChange={(e) => handleChange(e)}
                           value={form.username}
                           required/>
                </label>
                <label>
                    Password
                    <input name="password"
                           type="password"
                           onChange={(e) => handleChange(e)}
                           value={form.password}
                           required/>
                </label>
                <label>
                    Re Password
                    <input name="re_password"
                           type="password"
                           onChange={(e) => handleChange(e)}
                           value={form.re_password}
                           required/>
                </label>
                <button className="form-button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;