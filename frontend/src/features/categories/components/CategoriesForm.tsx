import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {CategoryMutation} from "../../../types";
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {TRANSACTION_CATEGORY} from "../../../constants";
import {selectCreateCategoryError, selectLoadingCreateCategory} from "../categoriesSlice";
import {createCategory, editCategory} from "../categoriesThunks";
import {enqueueSnackbar} from "notistack";

interface Props {
  editedCategory?: CategoryMutation;
  isEdit?: boolean;
  categoryId?: string;
}

const CategoriesForm: React.FC<Props> = ({editedCategory, isEdit, categoryId}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingAddBtn = useAppSelector(selectLoadingCreateCategory);
  const error = useAppSelector(selectCreateCategoryError);

  const initialState = editedCategory
    ? {
      ...editedCategory,
    }
    : {
      title: "",
      type: "",
    };

  const [state, setState] = useState<CategoryMutation>(initialState);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await dispatch(editCategory({category: state, id: categoryId as string}));
        enqueueSnackbar('Category was updated!!', {variant: 'success'});
        navigate('/cabinet/categories');
      } else {
        await dispatch(createCategory(state)).unwrap();
        enqueueSnackbar('Transaction category added!', {variant: 'success'});
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Typography component={'h4'} variant={'h4'} sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}>Add new transaction category:</Typography>
        <Grid item xs>
          <TextField
            id="title"
            label="Category title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            select
            name="type"
            value={state.type}
            label="Type"
            onChange={inputChangeHandler}
            required
            disabled={isEdit}
          >
            <MenuItem value="" disabled>Please select an account</MenuItem>
            {TRANSACTION_CATEGORY.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <LoadingButton
            loading={loadingAddBtn}
            type="submit"
            color="success"
            variant="contained"
          >
            Add
          </LoadingButton>
        </Grid>

      </Grid>
    </form>
  );
};

export default CategoriesForm;