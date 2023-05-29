import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAccounts, selectLoading} from "./accountsSlice";
import {fetchAccounts, removeAccount} from "./accountsThunks";
import {Box, CircularProgress, Grid} from "@mui/material";
import AccountsCard from "./components/AccountsCard";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);
  const loading = useAppSelector(selectLoading);

  const deleteAccount = async (id: string) => {
    await dispatch(removeAccount(id));
    await dispatch(fetchAccounts());
  };

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <Grid container gap={3}>
        {accounts.map((account) => {
          return <AccountsCard
            account={account}
            onDeleteBtnClick={() => deleteAccount(account._id)}
            key={account._id}/>
        })}
      </Grid>
      }
    </>
  );
};

export default Accounts;