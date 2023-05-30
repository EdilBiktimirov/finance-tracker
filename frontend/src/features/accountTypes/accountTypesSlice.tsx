import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {
  createAccountType,
  editAccountType,
  fetchAccountTypes,
  fetchOneAccountType,
  removeAccountType
} from "./accountTypesThunks";
import type {AccountType, ValidationError} from "../../types";

interface AccountTypesState {
  accountTypes: AccountType[];
  accountType: AccountType | null
  loading: boolean;
  loadingCreateAccountType: boolean;
  loadingRemoveAccountType: false | string;
  error: boolean;
  createAccountTypeError: ValidationError | null;
}

const initialState: AccountTypesState = {
  accountTypes: [],
  accountType: null,
  loading: false,
  loadingCreateAccountType: false,
  loadingRemoveAccountType: false,
  error: false,
  createAccountTypeError: null,
};

export const accountTypesSlice = createSlice({
  name: 'accountTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccountTypes.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchAccountTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.accountTypes = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAccountTypes.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOneAccountType.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchOneAccountType.fulfilled, (state, action) => {
      state.loading = false;
      state.accountType = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneAccountType.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createAccountType.pending, (state) => {
      state.loadingCreateAccountType = true;
      state.createAccountTypeError = null;
    });
    builder.addCase(createAccountType.fulfilled, (state) => {
      state.loadingCreateAccountType = false;
    });
    builder.addCase(createAccountType.rejected, (state, {payload: error}) => {
      state.loadingCreateAccountType = false;
      state.createAccountTypeError = error || null;
    });
    builder.addCase(editAccountType.pending, (state) => {
      state.loadingCreateAccountType = true;
      state.createAccountTypeError = null;
    });
    builder.addCase(editAccountType.fulfilled, (state) => {
      state.loadingCreateAccountType = false;
    });
    builder.addCase(editAccountType.rejected, (state, {payload: error}) => {
      state.loadingCreateAccountType = false;
      state.createAccountTypeError = error || null;
    });
    builder.addCase(removeAccountType.pending, (state, {meta}) => {
      state.loadingRemoveAccountType = meta.arg;
      state.error = false;
    });
    builder.addCase(removeAccountType.fulfilled, (state) => {
      state.loadingRemoveAccountType = false;
      state.error = false;
    });
    builder.addCase(removeAccountType.rejected, (state) => {
      state.loadingRemoveAccountType = false;
      state.error = true;
    });
  }
});

export const accountTypesReducer = accountTypesSlice.reducer;

export const selectAccountTypes = (state: RootState) => state.accountTypes.accountTypes;
export const selectOneAccountType = (state: RootState) => state.accountTypes.accountType;
export const selectLoading = (state: RootState) => state.accountTypes.loading;
export const selectLoadingCreateAccountType = (state: RootState) => state.accountTypes.loadingCreateAccountType;
export const selectLoadingRemoveAccountType = (state: RootState) => state.accountTypes.loadingRemoveAccountType;
export const selectCreateAccountTypeError = (state: RootState) => state.accountTypes.createAccountTypeError;
