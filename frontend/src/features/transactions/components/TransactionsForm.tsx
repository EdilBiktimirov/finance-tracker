import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {selectCreateTransactionError, selectLoadingCreateTransaction} from "../transactionsSlice";
import {createTransaction} from "../transactionsThunks";
import {Grid, MenuItem, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {enqueueSnackbar} from "notistack";
import type {Account, Category, TransactionMutation} from "../../../types";

interface Props {
  accounts: Account[];
  categories: Category[];
}

const TransactionsForm: React.FC<Props> = ({accounts, categories}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingAddBtn = useAppSelector(selectLoadingCreateTransaction);
  const error = useAppSelector(selectCreateTransactionError);

  const [state, setState] = useState<TransactionMutation>({
    account: "",
    category: "",
    sum: "",
    createdAt: null,
    comment: "",
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createTransaction(state)).unwrap();
      enqueueSnackbar('Transaction added!', {variant: 'success'});
      navigate('/accounts/' + state.account);
    } catch (e) {
      console.error(e);
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
        <Typography component={'h4'} variant={'h4'} sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}>Add new transaction:</Typography>
        <Grid item>
          <TextField
            select
            name="account"
            value={state.account}
            label="Account"
            onChange={inputChangeHandler}
            required
          >
            <MenuItem value="" disabled>Please select an account</MenuItem>
            {accounts.map((account) => (
              <MenuItem key={account._id} value={account._id}>{account.title}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            select
            name="category"
            value={state.category}
            label="Category"
            onChange={inputChangeHandler}
            required
          >
            <MenuItem value="" disabled>Please select a category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="sum"
            label="Sum KGS"
            type="number"
            value={state.sum}
            onChange={inputChangeHandler}
            name="sum"
            required
            InputProps={{
              inputProps: {
                min: 1,
              }
            }}
            error={Boolean(getFieldError('sum'))}
            helperText={getFieldError('sum')}
          />
        </Grid>
        <Grid item xs>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Choose date and time"
              format={'DD/MM/YY HH:mm'}
              value={state.createdAt}
              onChange={(newValue) => setState((prev) => ({...prev, createdAt: newValue}))}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="comment"
            label="Comment"
            value={state.comment}
            onChange={inputChangeHandler}
            name="comment"
            error={Boolean(getFieldError('comment'))}
            helperText={getFieldError('comment')}
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

export default TransactionsForm;