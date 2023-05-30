import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Category, ValidationError} from "../../types";
import {createCategory, editCategory, fetchCategories, fetchOneCategory, removeCategory} from "./categoriesThunks";

interface CategoryState {
  categories: Category[];
  category: Category | null,
  loading: boolean;
  loadingCreateCategory: boolean;
  loadingRemoveCategory: false | string;
  error: boolean;
  createCategoryError: ValidationError | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  loadingCreateCategory: false,
  loadingRemoveCategory: false,
  error: false,
  createCategoryError: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOneCategory.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.loadingCreateCategory = true;
      state.createCategoryError = null;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.loadingCreateCategory = false;
    });
    builder.addCase(createCategory.rejected, (state, {payload: error}) => {
      state.loadingCreateCategory = false;
      state.createCategoryError = error || null;
    });
    builder.addCase(editCategory.pending, (state) => {
      state.loadingCreateCategory = true;
      state.createCategoryError = null;
    });
    builder.addCase(editCategory.fulfilled, (state) => {
      state.loadingCreateCategory = false;
    });
    builder.addCase(editCategory.rejected, (state, {payload: error}) => {
      state.loadingCreateCategory = false;
      state.createCategoryError = error || null;
    });
    builder.addCase(removeCategory.pending, (state, {meta}) => {
      state.loadingRemoveCategory = meta.arg;
      state.error = false;
    });
    builder.addCase(removeCategory.fulfilled, (state) => {
      state.loadingRemoveCategory = false;
      state.error = false;
    });
    builder.addCase(removeCategory.rejected, (state) => {
      state.loadingRemoveCategory = false;
      state.error = true;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectOneCategory = (state: RootState) => state.categories.category;
export const selectLoading = (state: RootState) => state.categories.loading;
export const selectLoadingCreateCategory = (state: RootState) => state.categories.loadingCreateCategory;
export const selectLoadingRemoveCategory = (state: RootState) => state.categories.loadingRemoveCategory;
export const selectCreateCategoryError = (state: RootState) => state.categories.createCategoryError;
