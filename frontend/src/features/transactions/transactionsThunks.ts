import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";
import {enqueueSnackbar} from "notistack";
import type {Statistics, StatisticsMutation, Transaction, TransactionMutation, ValidationError} from "../../types";

export const fetchTransactions = createAsyncThunk<Transaction[], string | undefined>(
  'transactions/fetchAll',
  async (id) => {
    if (id) {
      const response = await axiosApi.get<Transaction[]>('/transactions/' + id);
      return response.data;
    } else {
      const response = await axiosApi.get<Transaction[]>('/transactions');
      return response.data;
    }
  });

export const createTransaction = createAsyncThunk<void, TransactionMutation, { state: RootState, rejectValue: ValidationError }>(
  'transactions/createTransaction',
  async (transaction, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        const transactionWithCorrectDate = {
          ...transaction,
          createdAt: transaction.createdAt?.format('YYYY-MM-DD HH:mm')
        }
        await axiosApi.post('/transactions', transactionWithCorrectDate);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        enqueueSnackbar(e.response.data.message, {variant: 'error'});
      }
      throw e;
    }
  });

export const removeTransaction = createAsyncThunk<void, string>(
  'transactions/removeOne',
  async (id) => {
    try {
      await axiosApi.delete('/transactions/' + id);
    } catch {
      throw new Error();
    }
  });

export const searchTransactions = createAsyncThunk<Statistics[], StatisticsMutation>(
  'transactions/search',
  async (data) => {
    const response = await axiosApi.get<Statistics[]>(
      '/transactions/search/?start=' + data.start?.format('YYYY-MM-DD') + '&end='
      + data.end?.format('YYYY-MM-DD') + '&category=' + data.category + '&account=' + data.account);
    return response.data;
  });