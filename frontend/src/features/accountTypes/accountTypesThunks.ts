import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AccountType, AccountTypeMutation, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";
import {enqueueSnackbar} from "notistack";

export const fetchAccountTypes = createAsyncThunk<AccountType[]>(
  'accountTypes/fetchAll',
  async () => {
    const response = await axiosApi.get<AccountType[]>('/account-types');
    return response.data;
  });

export const fetchOneAccountType = createAsyncThunk<AccountType, string>(
  'accountTypes/fetchOne',
  async (id) => {
      const response = await axiosApi.get<AccountType>('/account-types/' + id);
      return response.data;
  });

export const createAccountType = createAsyncThunk<void, AccountTypeMutation, { state: RootState, rejectValue: ValidationError }>(
  'accountType/createAccountType',
  async (accountType, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {

        const formData = new FormData();
        const keys = Object.keys(accountType) as (keyof AccountTypeMutation)[];

        keys.forEach(key => {
          const value = accountType[key];
          if (value !== null) {
            formData.append(key, value);
          }
        });

        await axiosApi.post('/account-types', formData);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

export const removeAccountType = createAsyncThunk<void, string, {rejectValue: ValidationError }>(
  'accountTypes/removeOne',
  async (id, {rejectWithValue}) => {
    try {
       await axiosApi.delete('/account-types/' + id);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      } else if (isAxiosError(e) && e.response && e.response.status === 403) {
        enqueueSnackbar(e.response.data.message, {variant: 'error'});
      }
      throw e;
    }
  });

interface UpdatedData {
  accountType: AccountTypeMutation,
  id: string;
}

export const editAccountType = createAsyncThunk<void, UpdatedData, { state: RootState, rejectValue: ValidationError }>(
  'accountType/editAccountType',
  async (data, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {

        const formData = new FormData();
        const keys = Object.keys(data.accountType) as (keyof AccountTypeMutation)[];

        keys.forEach(key => {
          const value = data.accountType[key];
          if (value !== null) {
            formData.append(key, value);
          }
        });

        await axiosApi.patch('/account-types/' + data.id, formData);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

