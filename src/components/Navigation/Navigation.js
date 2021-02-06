
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { authSelectors } from 'redux/auth';

import s from './Navigation.module.css';

export default function Navigation() {

    const isLoggedIn = useSelector( authSelectors.getIsLoggedIn);
    return (
        <>
            <nav className={s.container}>
                <NavLink exact to='/' className={s.link} activeClassName={s.active}>Home</NavLink>
                {isLoggedIn && <NavLink to='/contacts' className={s.link} activeClassName={s.active}>Phone Book</NavLink>}
            </nav>
        </>

    )
}
