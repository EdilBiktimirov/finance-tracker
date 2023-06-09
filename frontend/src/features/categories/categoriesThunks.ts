import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi";
import {enqueueSnackbar} from "notistack";
import type {Category, CategoryMutation, ValidationError} from "../../types";

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get<Category[]>('/categories');
    return response.data;
  });

export const fetchOneCategory = createAsyncThunk<Category, string>(
  'categories/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Category>('/categories/' + id);
    return response.data;
  });

export const createCategory = createAsyncThunk<void, CategoryMutation, { state: RootState, rejectValue: ValidationError }>(
  'categories/createCategory',
  async (category, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        await axiosApi.post('/categories', category);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

export const removeCategory = createAsyncThunk<void, string, { state: RootState }>(
  'categories/removeOne',
  async (id, {getState}) => {
    try {
      const user = getState().users.user;
      if (user) {
        await axiosApi.delete('/categories/' + id);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        enqueueSnackbar(e.response.data.message, {variant: 'error'});
      }
      throw e;
    }
  });

interface UpdatedData {
  category: CategoryMutation,
  id: string,
}

export const editCategory = createAsyncThunk<void, UpdatedData, { state: RootState, rejectValue: ValidationError }>(
  'categories/editCategory',
  async (data, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        await axiosApi.patch('/categories/' + data.id, data.category);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

