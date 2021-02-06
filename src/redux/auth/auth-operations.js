import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};



//  * POST @ /users/signup
//  * body: { name, email, password }
export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);    
  }
});


//  * POST @ /users/login
//  * body: { email, password }
export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI)=> {
  try {
        const { data } = await axios.post('/users/login', credentials);
        token.set(data.token);
        return data;
  } catch (error) {
    // alert('logIn: Добавить обработку ошибки error.message');
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const logOut = createAsyncThunk('auth/logout', async (_,thunkAPI) => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
        // alert('logOut: Добавить обработку ошибки error.message');
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (!persistedToken) return thunkAPI.rejectWithValue();

    token.set(persistedToken);

    try {
      const {data} = await axios.get('/users/current');
    return data;
    
    } catch (error) {
      // alert('refresh: Добавить обработку ошибки error.message');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);