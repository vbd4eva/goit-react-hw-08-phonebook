import { createSlice } from '@reduxjs/toolkit';
import { contactsOperations } from 'redux/contacts';

const initialState = {
    items: [],
    filter: '',
    isLoading: false,
    error: null
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        changeFilter(state, action) {
            state.filter = action.payload;
        },
        resetError(state) {
            state.error = initialState.error;
        }
    },
    extraReducers: {
        [contactsOperations.fetchContacts.pending](state) {
           state.error = initialState.error;           
           state.isLoading = true;           
        },
        [contactsOperations.fetchContacts.fulfilled](state, action) {
            state.items = action.payload;   
            state.isLoading = false;
        },
        [contactsOperations.fetchContacts.rejected](state, action) {
            console.log('contactsOperations.fetchContacts.rejected = > ',action)
            state.error = 'contactsOperations.fetchContacts.rejected = > ' + action.payload;    
            state.isLoading = false;
        },


        [contactsOperations.addContact.pending](state) {
            state.error = initialState.error;  
           state.isLoading = true; 
        },
        [contactsOperations.addContact.fulfilled](state, action) {
            console.log(action.payload);
            state.items = [action.payload, ...state.items];
            state.isLoading = false;
        },
        [contactsOperations.addContact.rejected](state, action) {
            console.log('contactsOperations.addContact.rejected = > ',action)
            state.error = 'contactsOperations.addContact.rejected = > '+action.payload;   
            state.isLoading = false;
        },

        
        [contactsOperations.deleteContact.pending](state) {
            state.error = initialState.error;   
           state.isLoading = true; 
        },
        [contactsOperations.deleteContact.fulfilled](state, action) {
              state.items = state.items.filter(({ id }) => (id !== action.payload));
              state.isLoading = false;
        },        
        [contactsOperations.deleteContact.rejected](state, action) {
            console.log('contactsOperations.deleteContact.rejected = > ',action)
            state.error = 'contactsOperations.deleteContact.rejected = > ' + action.payload;  
            state.isLoading = false; 
            
        }
        
        
        

    }
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice.reducer;