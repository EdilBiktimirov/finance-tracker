import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {selectCreateAccountTypeError, selectLoadingCreateAccountType} from "../accountTypesSlice";
import {createAccountType, editAccountType} from "../accountTypesThunks";
import {Grid, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {enqueueSnackbar} from "notistack";
import FileInput from "../../../components/UI/FileInput";
import type {AccountTypeMutation} from "../../../types";

interface Props {
  editedAccountType?: AccountTypeMutation;
  isEdit?: boolean;
  accountTypeId?: string;
}

const AccountTypesForm: React.FC<Props> = ({editedAccountType, isEdit, accountTypeId}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingAddBtn = useAppSelector(selectLoadingCreateAccountType);
  const error = useAppSelector(selectCreateAccountTypeError);


  const initialState = editedAccountType
    ? {
      ...editedAccountType,
    }
    : {
      title: "",
      image: null,
    };

  const [state, setState] = useState<AccountTypeMutation>(initialState);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await dispatch(editAccountType({accountType: state, id: accountTypeId as string})).unwrap()
        enqueueSnackbar('Account type updated!', {variant: 'success'});
        navigate('/cabinet/account-types');
      } else {
        await dispatch(createAccountType(state)).unwrap();
        enqueueSnackbar('Account type added!', {variant: 'success'});
        navigate('/cabinet/account-types');
      }
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
        <Typography
          component={'h4'}
          variant={'h4'}
          sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}
        >
          {isEdit ? 'Edit account type:' : ' Add new account type:'}
        </Typography>
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
            {isEdit ? "Edit" : "Add"}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountTypesForm;