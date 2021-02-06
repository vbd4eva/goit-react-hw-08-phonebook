import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import {contactsActions, contactsOperations, contactsSelectors } from 'redux/contacts/';



import s from './ContactAddingForm.module.css';

export default function ContactAddingForm () { 
    const dispatch = useDispatch();
    
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const contactCards = useSelector(contactsSelectors.getContacts);

    const stateRange = {
        name: setName,
        number: setNumber
    }

    function handleChange(e) {
        const { name, value } = e.currentTarget;
        const setState = stateRange[name];
        setState(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name && number) handleContactCart({ name, number });
        reset();
    }

    function reset() { 
        setName('');
        setNumber('');
    }


    return (
        <form className={s.form} onSubmit={handleSubmit}>
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
                    <span className={s.labelText}>Phone</span>
                    <input
                        className={s.inputText}
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="number"
                        value={number}
                        onChange={handleChange}
                        placeholder="067-333-4444"
                        required
                    />
                </label>
            </div>
      
            <button className={s.submitBtn} type="submit">
                <span className={s.submitBtn__text}>Add contact</span>
            </button>
        </form>
    );

    
    function handleContactCart(newContactCart){   
        const doubleContact = findInContacts(newContactCart.name);  
        if (doubleContact) { 
            onDoubleAddingReaction(doubleContact);
            return;
        }
        dispatch(contactsOperations.addContact(newContactCart));
    }

    function findInContacts(newContactName) {
        return contactCards.find(({ name }) => name === newContactName);
    };
    
    function onDoubleAddingReaction(doubleContact) { 
        const { name } = doubleContact; 
        toast(name + ' is already in contacts.');
        dispatch(contactsActions.changeFilter(name));
    }  
}