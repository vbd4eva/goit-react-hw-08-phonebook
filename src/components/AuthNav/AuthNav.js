import { NavLink } from 'react-router-dom';

import s from './AuthNav.module.css';

export default function AuthNav() {
    return (
        <div className={s.container}>
            <NavLink
                to="/register"
                exact
                className={s.link}
                activeClassName={s.active}
            >
                Sign up
            </NavLink>
            <NavLink
                to="/login"
                exact
                className={s.link}
                activeClassName={s.active}
            >
                Log in
            </NavLink>
        </div>
    )
}
