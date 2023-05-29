import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {usersReducer} from "../features/users/usersSlice";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {accountsReducer} from "../features/accounts/accountsSlice";
import {accountTypesReducer} from "../features/accountTypes/accountTypesSlice";
import {transactionsReducer} from "../features/transactions/transactionsSlice";
import {categoriesReducer} from "../features/categories/categoriesSlice";

const usersPersistConfig = {
  key: 'finance:users',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  accounts: accountsReducer,
  accountTypes: accountTypesReducer,
  transactions: transactionsReducer,
  categories: categoriesReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;