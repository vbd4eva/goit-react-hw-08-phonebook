import s from './Wrapper.module.css';

export default function Wrapper({children}) {
    return (
        <main className={s.main}>
            {children}
        </main>
    )
}
