import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from 'redux-logger';

import {contactsReducer} from './contacts';
import {authReducer} from './auth';

const middleware = [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }), logger];

// const contactsPersistConfig = {
//   // key: 'contacts',
//   key: 'root',
//   storage,
//   blacklist: ['filter']
// }
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({  
  reducer:  {
    // contacts: persistReducer(contactsPersistConfig, contactsReducer),
    contacts: contactsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    // auth: authReducer
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development'
});

export const persistor = persistStore(store);