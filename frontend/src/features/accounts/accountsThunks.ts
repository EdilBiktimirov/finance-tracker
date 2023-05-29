import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Account, AccountMutation, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchAccounts = createAsyncThunk<Account[]>(
  'accounts/fetchAll',
  async () => {
    const response = await axiosApi.get<Account[]>('/accounts');
    return response.data;
  });

export const fetchOneAccount = createAsyncThunk<Account, string>(
  'accounts/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Account>('/accounts/' + id);
    return response.data;
  });

export const createAccount = createAsyncThunk<void, AccountMutation, { state: RootState, rejectValue: ValidationError }>(
  'accounts/createAccount',
  async (account, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        await axiosApi.post('/accounts', account);
      }

    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

export const removeAccount = createAsyncThunk<void, string>(
  'accounts/removeOne',
  async (id) => {
    try {
      await axiosApi.delete('/accounts/' + id);
    } catch {
      throw new Error();
    }
  });

