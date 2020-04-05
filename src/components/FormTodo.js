import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo__server, editTodo__server, removeTodo__server} from '../redux/reducer/todos/action';

const FormTodo = (props) => {
    const dispatch = useDispatch();
    const [isChange, setIsChange] = useState(false);
    const [form, setForm] = useState({name: "", content: ""});

    useEffect(() => {
        if (props.todo && props.todo !== 1) {
            setForm(props.todo);
            console.log(props.todo);
        } else {
            setForm({name: "", content: ""})
        }
    }, [props])

    const handleChange = (event) => {
        setIsChange(true);
        setForm(Object.assign({}, form,{
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.todo && props.todo !== 1) {
            dispatch(editTodo__server(form))
        } else {
            dispatch(addTodo__server(form))
        }
    };

    const handleRemove = () => {
        props.close(0);
        if (props.todo && props.todo !== 1) {
            dispatch(removeTodo__server(props.todo.id))
        }
    }

    return (
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <button onClick={() => props.close(0)}>Close</button>
            <label>
                Name
                <input name="name" onChange={(e) => handleChange(e)} value={form.name} />
            </label>
            <label>
                Content
                <textarea name="content" onChange={(e) => handleChange(e)} value={form.content} />
            </label>
            <div className="form-button">
                {props.todo && props.todo !== 1
                ? <button onClick={() => handleRemove()} type="button">Delete</button>
                : null}
                <button type="submit" disabled={!isChange}>Next</button>
            </div>
        </form>
    );
};

export default FormTodo;