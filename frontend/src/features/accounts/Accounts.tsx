import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAccounts, selectLoading} from "./accountsSlice";
import {fetchAccounts, removeAccount} from "./accountsThunks";
import {Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import AccountsCard from "./components/AccountsCard";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);
  const loading = useAppSelector(selectLoading);

  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState('');

  const handleClick = (id: string) => {
    setAccountId(id);
    setOpen(true);
  };

  const handleConfirm = async (id: string) => {
    await dispatch(removeAccount(id));
    await dispatch(fetchAccounts());
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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
            onDeleteBtnClick={() => handleClick(account._id)}
            key={account._id}/>
        })}
        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle>Warning!</DialogTitle>
          <DialogContent>Deleting an account will result in a complete deletion of transactions on that account</DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleConfirm(accountId)} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>}
    </>
  );
};

export default Accounts;