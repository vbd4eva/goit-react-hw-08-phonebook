import { useSelector } from 'react-redux';
import { contactsSelectors } from 'redux/contacts';

import Notification from 'components/Notification/Notification';
import Header from 'components/Header/Header';
import s from './ContactsBook.module.css';


 
export default function ContactsBook({bookLength=0, children}) {

    const idLoading = useSelector(contactsSelectors.getIsLoading);

    const message = (idLoading) ? "Phone book is loading..." : "PhoneBook is emty";

    if (!bookLength) return  < Notification message = { message } />;

    return (
        <>
            <Header title={'Contacts'} />
                <div className={s.contactsContainer}>
                    {children}
                </div>
        </>
    )
}
