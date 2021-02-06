import { createSlice } from '@reduxjs/toolkit';
import {authOperations} from 'redux/auth';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshingUser: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.error = initialState.error;
    }
  }, 
  extraReducers: {
    [authOperations.register.pending](state) {
      state.error = initialState.error;
     },
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.register.rejected](state, action) {
      console.log('authOperations.register.rejected => ',action);
      state.error = action.payload;
    },

    [authOperations.logIn.pending](state) {
      state.error = initialState.error;
     },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;  
    },
    [authOperations.logIn.rejected](state, action) {
      console.log('authOperations.logIn.rejected => ', action);
      state.error = action.payload;
    },

    [authOperations.logOut.pending](state) {
      state.error = initialState.error;
     },
    [authOperations.logOut.fulfilled](state) {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoggedIn = initialState.isLoggedIn;
    },
    [authOperations.logOut.rejected](state,action) {
      console.log('authOperations.logOut.rejected => ', action);
      state.error = action.payload;
    },


    [authOperations.refresh.pending](state) { 
      state.isRefreshingUser = true;
      state.error = initialState.error;
    },
    [authOperations.refresh.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshingUser = false;
    },
    [authOperations.refresh.rejected](state, action) { 
      state.isRefreshingUser = false;

      console.log('authOperations.refresh.rejected',action);
      // state.error = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;