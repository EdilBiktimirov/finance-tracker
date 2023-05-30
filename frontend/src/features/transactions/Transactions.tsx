import React, {useEffect} from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import TransactionsCard from "./components/TransactionsCard";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoading, selectTransactions} from "./transactionsSlice";
import {fetchTransactions, removeTransaction} from "./transactionsThunks";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneAccount} from "../accounts/accountsThunks";
import {selectOneAccount} from "../accounts/accountsSlice";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectLoading);
  const account = useAppSelector(selectOneAccount);
  const navigate = useNavigate();
  const {id} = useParams() as { id: string };

  const deleteTransaction = async (idTransaction: string) => {
    await dispatch(removeTransaction(idTransaction));
    await dispatch(fetchTransactions(id));
    await dispatch(fetchOneAccount(id));
  };

  useEffect(() => {
    dispatch(fetchOneAccount(id));
    dispatch(fetchTransactions(id));
  }, [dispatch, id]);


  return (
    <>

      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <>

        <Grid item>
          <Typography variant={'h4'} sx={{textAlign: 'center', fontWeight: 'bolder'}}>{account?.title}</Typography>
        </Grid>

        <Grid container gap={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography sx={{color: 'green', fontWeight: 'bolder'}}> <strong
              style={{fontSize: '20px', color: 'grey'}}>Balance: </strong>{account?.amount + ' KGS'}</Typography>
          </Grid>

          <Grid item>
            {transactions.length ? <Button
                variant='outlined'
                color='info'
                sx={{fontWeight: 'bold'}}
                onClick={() => navigate('/statistics/' + id)}>Show graphic
                statistics</Button>
              : <Button
                variant='outlined'
                color='info'
                sx={{fontWeight: 'bold'}}
                onClick={() => navigate('/add-new-transaction')}>Add new transaction</Button>}
          </Grid>


          {transactions.map((transaction) => {
            return <TransactionsCard
              transaction={transaction}
              key={transaction._id}
              onDeleteBtnClick={() => deleteTransaction(transaction._id)}/>
          })}
        </Grid>
      </>
      }
    </>
  );
};

export default Transactions;