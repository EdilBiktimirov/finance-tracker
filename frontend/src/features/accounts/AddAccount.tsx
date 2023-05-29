import React, {useEffect} from 'react';
import {Box, CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoading} from "./accountsSlice";
import AccountsForm from "./components/AccountsForm";
import {fetchAccountTypes} from "../accountTypes/accountTypesThunks";
import {selectAccountTypes} from "../accountTypes/accountTypesSlice";

const AddAccount = () => {
  const dispatch = useAppDispatch();
  const accountTypes = useAppSelector(selectAccountTypes);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAccountTypes());
  }, [dispatch]);

  return (
    <>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <AccountsForm accountTypes={accountTypes}/>}
    </>
  );
};

export default AddAccount;