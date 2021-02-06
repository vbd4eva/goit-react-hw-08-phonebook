import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { contactsOperations , contactsSelectors, contactsActions} from 'redux/contacts/';

import Header from 'components/Header/Header';
import ContactAddingForm from 'components/ContactAddingForm/ContactAddingForm';
import ContactsBook from 'components/ContactsBook/ContactsBook';
import ContactFilter from 'components/ContactFilter/ContactFilter';
import ContactList from 'components/ContactList/ContactList';

export default function ContactsView() {

    const dispatch = useDispatch();
    const error = useSelector(contactsSelectors.getContactsError);
    
    useEffect(() => {
        dispatch(contactsOperations.fetchContacts());
    }, [dispatch]);

    useEffect(() => {
            if (error) {
            toast(error);
            dispatch(contactsActions.resetError());
        }
    }, [dispatch, error]);

    
    const contactsBookLength = useSelector(contactsSelectors.getContactListLength);
    
    return (
        <>
            <Header title={"Phonebook"} rank={'1'} />      
            <ContactAddingForm />
       
            <ContactsBook bookLength={contactsBookLength}>
               <ContactFilter />
        
               <ContactList />
            </ContactsBook>  
        </>
    )
}
