import {Statistics, Transaction, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createTransaction, fetchTransactions, removeTransaction, searchTransactions} from "./transactionsThunks";

interface TransactionsState {
  transactions: Transaction[];
  statistics: Statistics[];
  loading: boolean;
  loadingSearch: boolean,
  loadingCreateTransaction: boolean;
  loadingRemoveTransaction: false | string;
  error: boolean;
  createTransactionError: ValidationError | null;
}

const initialState: TransactionsState = {
  transactions: [],
  statistics: [],
  loading: false,
  loadingSearch: false,
  loadingCreateTransaction: false,
  loadingRemoveTransaction: false,
  error: false,
  createTransactionError: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    cleanStatistics: (state) => {
      state.statistics = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
      state.error = false;
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(searchTransactions.pending, (state) => {
      state.loadingSearch = true;
      state.error = false;
    });
    builder.addCase(searchTransactions.fulfilled, (state, action) => {
      state.loadingSearch = false;
      state.statistics = action.payload;
      state.error = false;
    });
    builder.addCase(searchTransactions.rejected, (state) => {
      state.loadingSearch = false;
      state.error = true;
    });
    builder.addCase(createTransaction.pending, (state) => {
      state.loadingCreateTransaction = true;
      state.createTransactionError = null;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.loadingCreateTransaction = false;
    });
    builder.addCase(createTransaction.rejected, (state, {payload: error}) => {
      state.loadingCreateTransaction = false;
      state.createTransactionError = error || null;
    });
    builder.addCase(removeTransaction.pending, (state, {meta}) => {
      state.loadingRemoveTransaction = meta.arg;
      state.error = false;
    });
    builder.addCase(removeTransaction.fulfilled, (state) => {
      state.loadingRemoveTransaction = false;
      state.error = false;
    });
    builder.addCase(removeTransaction.rejected, (state) => {
      state.loadingRemoveTransaction = false;
      state.error = true;
    });
  }
});

export const transactionsReducer = transactionsSlice.reducer;

export const {cleanStatistics} = transactionsSlice.actions;

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectStatistics = (state: RootState) => state.transactions.statistics;
export const selectLoading = (state: RootState) => state.transactions.loading;
export const selectSearchLoading = (state: RootState) => state.transactions.loadingSearch;
export const selectLoadingCreateTransaction = (state: RootState) => state.transactions.loadingCreateTransaction;
export const selectLoadingRemoveTransaction = (state: RootState) => state.transactions.loadingRemoveTransaction;
export const selectCreateTransactionError = (state: RootState) => state.transactions.createTransactionError;