import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {selectCreateAccountError, selectLoadingCreateAccount} from "../accountsSlice";
import {AccountMutation, AccountType} from "../../../types";
import {createAccount} from "../accountsThunks";
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {enqueueSnackbar} from "notistack";

interface Props {
  accountTypes: AccountType[];
}

const AccountsForm: React.FC<Props> = ({accountTypes}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingAddBtn = useAppSelector(selectLoadingCreateAccount);
  const error = useAppSelector(selectCreateAccountError);

  const [state, setState] = useState<AccountMutation>({
    accountType: "",
    title: "",
    amount: "",
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAccount(state)).unwrap();
      enqueueSnackbar('Account added!', {variant: 'success'});
      navigate('/');
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
        <Typography component={'h4'} variant={'h4'} sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}>Add new account:</Typography>
        <Grid item>
          <TextField
            select
            name="accountType"
            value={state.accountType}
            label="Account type"
            onChange={inputChangeHandler}
            required
          >
            <MenuItem value="" disabled>Please select an account type</MenuItem>
            {accountTypes.map((type) => (
              <MenuItem key={type._id} value={type._id}>{type.title}</MenuItem>
            ))}
          </TextField>
        </Grid>
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
          <TextField
            id="amount"
            label="Amount KGS"
            type="number"
            value={state.amount}
            onChange={inputChangeHandler}
            name="amount"
            required
            InputProps={{
              inputProps: {
                min: 0,
              }
            }}
            error={Boolean(getFieldError('amount'))}
            helperText={getFieldError('amount')}
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            loading={loadingAddBtn}
            type="submit"
            color="success"
            variant="contained"
            size="medium"
          >
            Add
          </LoadingButton>
        </Grid>

      </Grid>
    </form>
  );
};

export default AccountsForm;