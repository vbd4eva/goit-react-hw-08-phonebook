import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {authSelectors, authOperations, authActions } from 'redux/auth/';

import Header from 'components/Header/Header';


import s from "./RegisterView.module.css";
export default function RegisterView() {

    const dispatch = useDispatch();
    const error = useSelector(authSelectors.getAuthError);

    useEffect(() => {
        if (error) {
            toast(`Failed to register with error: "${error}". Please try to change the entered form fields data and try again.`);
            dispatch(authActions.resetError());
        }
    }, [error,dispatch]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const stateRange = {
        name: setName,
        email: setEmail,
        password: setPassword
    }

    function handleChange(e) {
        const { name, value } = e.currentTarget;
        const setState = stateRange[name];
        setState(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(authOperations.register({name,email,password}));
    }



    return (
        <div>
            <Header title={"User register page"} rank={'1'} /> 

            <form onSubmit={handleSubmit} autoComplete="off" className={s.form}>
                
                <div className={s.labelContainer}>

                    <label className={s.label}>
                         <span className={s.labelText}>Name</span>
                        <input
                            className={s.inputText}
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className={s.label}>
                         <span className={s.labelText}>Email</span>
                        <input
                            className={s.inputText}
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className={s.label}>
                         <span className={s.labelText}>Password</span>
                        <input
                            className={s.inputText}
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <button type="submit" className={s.submitBtn}>
                    <span className={s.submitBtn__text}>Register now</span>
                </button>
            </form>
        </div>
    )
}
