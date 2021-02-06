import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { authSelectors, authOperations, authActions} from 'redux/auth';

import s from './UserMenu.module.css';
export default function UserMenu() {

    const UserName = useSelector(authSelectors.getUsername);
    const error = useSelector(authSelectors.getAuthError);
    const dispatch = useDispatch();

        useEffect(() => {
        if (error) {
            toast(`Failed to logOut with error: "${error}". Please try to reload page or try again later.`);
            dispatch(authActions.resetError());
        }
    }, [error,dispatch]);

    return (
        <div className={s.container}>

            <p className={s.greeting}>Welcome, <span className={s.userNmae}>{UserName}</span></p>

            <button type="button" onClick={() => dispatch(authOperations.logOut())} className={s.logOut}>
                <span className={s.btnText}>Log out</span>
            </button>

        </div>
    )
}
