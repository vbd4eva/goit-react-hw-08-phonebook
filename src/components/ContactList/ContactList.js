import { useSelector } from 'react-redux';
import {contactsSelectors} from 'redux/contacts'

import Notification from 'components/Notification/Notification'
import ContactListItem from './ContactListItem/ContactListItem'
import s from './ContactList.module.css'

const notificationMessages = {
    NOTHING_FINDED: "is Nothing finded...Try to change request",
}

export default function ContactList() {

    const contactList = useSelector(contactsSelectors.getFilteredContactList);

    if (!contactList.length) return <Notification message={notificationMessages.NOTHING_FINDED} />;

    return (
        <ul className={s.list}>
            {contactList.map(
                (contact) =>
                (<li key={contact.id} className={s.item}>
                    <ContactListItem {...contact} />
                </li>)
            )}
        </ul>
    );
}

