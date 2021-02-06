import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {authSelectors, authOperations, authActions} from 'redux/auth';

import Header from 'components/Header/Header';

import s from './LoginView.module.css';
export default function LoginView() {
    
    const dispatch = useDispatch();
    const error = useSelector(authSelectors.getAuthError);

    useEffect(() => {
        if (error) {
            toast(`Failed to login with error: "${error}". Please try to change the entered form fields data and try again.`);
            dispatch(authActions.resetError());
        }
    }, [dispatch, error]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const stateRange = {
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
        dispatch(authOperations.logIn({ email, password }));
    }

    return (
        <div>
            <Header title={"User login page."} rank={'1'} />

            <form onSubmit={handleSubmit} autoComplete="off" className={s.form}>
            
                <div className={s.labelContainer}>
                    <label  className={s.label}>
                        <span className={s.labelText}>Email  </span>
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

                <button className={s.submitBtn} type="submit">
                    <span className={s.submitBtn__text}>Log in</span>
                </button>
            </form>
            
        </div>


    )
}
