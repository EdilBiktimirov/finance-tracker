import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AccountType, AccountTypeMutation, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchAccountTypes = createAsyncThunk<AccountType[]>(
  'accountTypes/fetchAll',
  async () => {
    const response = await axiosApi.get<AccountType[]>('/account-types');
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

export const removeAccountType = createAsyncThunk<void, string>(
  'accountTypes/removeOne',
  async (id) => {
    try {
      await axiosApi.delete('/accounts/' + id);
    } catch {
      throw new Error();
    }
  });

