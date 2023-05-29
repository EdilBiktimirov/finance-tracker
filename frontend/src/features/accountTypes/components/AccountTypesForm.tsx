import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {Grid, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {AccountTypeMutation} from "../../../types";
import {selectCreateAccountTypeError, selectLoadingCreateAccountType} from "../accountTypesSlice";
import {createAccountType} from "../accountTypesThunks";
import FileInput from "../../../components/UI/FileInput";
import {enqueueSnackbar} from "notistack";

const AccountTypesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingAddBtn = useAppSelector(selectLoadingCreateAccountType);
  const error = useAppSelector(selectCreateAccountTypeError);

  const [state, setState] = useState<AccountTypeMutation>({
    title: "",
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAccountType(state)).unwrap();
      enqueueSnackbar('Account type added!', {variant: 'success'});
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    setState(prev => ({
      ...prev, [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Typography component={'h4'} variant={'h4'} sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}>Add new account type:</Typography>
        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputHandler}
            name="image"
            label="image"
            type="image/*"
            error={Boolean(getFieldError('image'))}
            helperText={getFieldError('image')!}
          />
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

export default AccountTypesForm;