import React, {useEffect} from 'react';
import TransactionsForm from "./components/TransactionsForm";
import {fetchAccounts} from "../accounts/accountsThunks";
import {fetchCategories} from "../categories/categoriesThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAccounts, selectLoading} from "../accounts/accountsSlice";
import {selectCategories} from "../categories/categoriesSlice";
import {Box, CircularProgress} from "@mui/material";

const AddTransaction = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoading);


  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <TransactionsForm accounts={accounts} categories={categories}/>}
    </>
  );
};

export default AddTransaction;