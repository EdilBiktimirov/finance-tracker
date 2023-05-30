import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createAccount, fetchAccounts, fetchOneAccount, removeAccount} from "./accountsThunks";
import type {Account, ValidationError} from "../../types";

interface AccountsState {
  accounts: Account[];
  account: Account | null;
  loading: boolean;
  loadingCreateAccount: boolean;
  loadingRemoveAccount: false | string;
  error: boolean;
  createAccountError: ValidationError | null;
}

const initialState: AccountsState = {
  accounts: [],
  account: null,
  loading: false,
  loadingCreateAccount: false,
  loadingRemoveAccount: false,
  error: false,
  createAccountError: null,
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAccounts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOneAccount.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchOneAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.account = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneAccount.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createAccount.pending, (state) => {
      state.loadingCreateAccount = true;
      state.createAccountError = null;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loadingCreateAccount = false;
    });
    builder.addCase(createAccount.rejected, (state, {payload: error}) => {
      state.loadingCreateAccount = false;
      state.createAccountError = error || null;
    });
    builder.addCase(removeAccount.pending, (state, {meta}) => {
      state.loadingRemoveAccount = meta.arg;
      state.error = false;
    });
    builder.addCase(removeAccount.fulfilled, (state) => {
      state.loadingRemoveAccount = false;
      state.error = false;
    });
    builder.addCase(removeAccount.rejected, (state) => {
      state.loadingRemoveAccount = false;
      state.error = true;
    });
  }
});

export const accountsReducer = accountsSlice.reducer;

export const selectAccounts = (state: RootState) => state.accounts.accounts;
export const selectOneAccount = (state: RootState) => state.accounts.account;
export const selectLoading = (state: RootState) => state.accounts.loading;
export const selectLoadingCreateAccount = (state: RootState) => state.accounts.loadingCreateAccount;
export const selectLoadingRemoveAccount = (state: RootState) => state.accounts.loadingRemoveAccount;
export const selectCreateAccountError = (state: RootState) => state.accounts.createAccountError;
