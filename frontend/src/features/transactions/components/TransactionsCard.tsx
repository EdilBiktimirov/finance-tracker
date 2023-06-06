import React, {MouseEventHandler} from 'react';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import {selectLoadingRemoveTransaction} from "../transactionsSlice";
import AccordionDetails from '@mui/material/AccordionDetails';
import {Grid, Typography} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {LoadingButton} from "@mui/lab";
import {useAppSelector} from "../../../app/hooks";
import type {Transaction} from "../../../types";

export interface Props {
  transaction: Transaction;
  onDeleteBtnClick: MouseEventHandler;
}

const TransactionsCard: React.FC<Props> = ({transaction, onDeleteBtnClick}) => {
  const loadingRemoveBtn = useAppSelector(selectLoadingRemoveTransaction);
  dayjs.extend(utc);
  let transactionTypeStyle;
  let symbol;

  if (transaction.category.type === 'income') {
    transactionTypeStyle = {color: 'green', fontWeight: 'bolder'};
    symbol = '+';
  } else {
    transactionTypeStyle = {color: 'red', fontWeight: 'bolder'};
    symbol = '-';
  }

  return (
    <Accordion sx={{width: '100%'}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Grid item xs>
          <Typography sx={{color: 'grey'}}>{dayjs.utc(transaction.createdAt).format('DD.MM.YY HH:mm')}</Typography>
        </Grid>
        <Grid item xs>
          <Typography sx={{fontWeight: 'bolder', color: 'grey'}}>{transaction.account.title}</Typography>
        </Grid>
        <Grid item xs>
          <Typography sx={{fontWeight: 'bolder'}}>{transaction.category.title}</Typography>
        </Grid>
        <Grid item xs>
          <Typography style={transactionTypeStyle}>{symbol + ' ' + transaction.sum + ' KGS'}</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{background: 'WhiteSmoke'}}>
        <Grid item xs>
          <Typography sx={{textAlign: 'center'}} gutterBottom>{transaction.comment}</Typography>
        </Grid>
        <Grid item>
          <LoadingButton
            color="error"
            size="small"
            variant="outlined"
            sx={{fontWeight: 'bold', mx: 'auto', display: 'block'}}
            loading={loadingRemoveBtn ? loadingRemoveBtn === transaction._id : false}
            onClick={onDeleteBtnClick}>
            Delete
          </LoadingButton>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
};

export default TransactionsCard;