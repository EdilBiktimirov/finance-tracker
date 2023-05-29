import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {AccountType, ValidationError} from "../../types";
import {createAccountType, fetchAccountTypes, removeAccountType} from "./accountTypesThunks";

interface AccountTypesState {
  accountTypes: AccountType[];
  loading: boolean;
  loadingCreateAccountType: boolean;
  loadingRemoveAccountType: false | string;
  error: boolean;
  createAccountTypeError: ValidationError | null;
}

const initialState: AccountTypesState = {
  accountTypes: [],
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
export const selectLoading = (state: RootState) => state.accountTypes.loading;
export const selectLoadingCreateAccountType = (state: RootState) => state.accountTypes.loadingCreateAccountType;
export const selectLoadingRemoveAccountType = (state: RootState) => state.accountTypes.loadingRemoveAccountType;
export const selectCreateAccountTypeError = (state: RootState) => state.accountTypes.createAccountTypeError;
