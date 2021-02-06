import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts',
    async (_, { rejectWithValue }) => {
        try {
            // axios.defaults.headers.common.Authorization = '';
            const response = await axios.get('/contacts');
            return response.data;
        } catch (error) {
            // alert('fetchContacts: Добавить обработку ошибки = '+error.message);
            return rejectWithValue(error.message);
        }
    });

export const deleteContact = createAsyncThunk('contacts/Delete',
    async (contactId, { rejectWithValue }) => {
        try {
            await axios.delete('/contacts/' + contactId);
            return contactId;

        } catch (error) {
            // alert('deleteContact: Добавить обработку ошибки = '+error.message);
            return rejectWithValue(error.message);
        }
    });
    

export const addContact =  createAsyncThunk('contacts/Add',
    async (newContactCart, { rejectWithValue }) => {
        try {
          
            const response = await axios.post('/contacts', newContactCart);
            return response.data;

        } catch (error) {
            // alert('addContact: Добавить обработку ошибки = '+error.message);
            return rejectWithValue(error.message);
        }
    });