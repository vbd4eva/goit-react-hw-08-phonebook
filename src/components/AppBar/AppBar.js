import { useSelector } from 'react-redux';

import { authSelectors } from 'redux/auth';

import s from './AppBar.module.css';

import Navigation from 'components/Navigation/Navigation';
import UserMenu from 'components/UserMenu/UserMenu';
import AuthNav from 'components/AuthNav/AuthNav';

export default function AppBar() {

    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

    return (
        <>
            <header className={s.header}>
                <Navigation />
                {isLoggedIn ? <UserMenu /> : <AuthNav />}
            </header>


            {/* <hr/> */}

                {/* <div className={s.container}>
                        <div class={s.results}>
                            <p className={s.name}>Good: <span className={s.value}>good</span></p>
                            <p className={s.name}>Neutral: <span className={s.value}>neutral</span></p>
                            <p className={s.name}>Bad: <span className={s.value}>bad</span></p>
                        </div> */}
                        {/* <p className={s.total}>Total: <span className={s.value}>total</span></p> */}
                        {/* (<p className={s.positivePercentage}>Positive feedback: <span className={s.value}>positivePercentage</span>%</p>)}
                </div> */}

            {/* <hr/> */}
        </>
    )
}