import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Category, CategoryMutation, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get<Category[]>('/categories');
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
    } catch {
      throw new Error();
    }
  });

