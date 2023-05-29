import React, {MouseEventHandler} from 'react';
import {Transaction} from "../../../types";
import {Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {LoadingButton} from "@mui/lab";
import {useAppSelector} from "../../../app/hooks";
import {selectLoadingRemoveTransaction} from "../transactionsSlice";
import utc from 'dayjs/plugin/utc';

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
    transactionTypeStyle = {color: 'green'};
    symbol = '+';
  } else {
    transactionTypeStyle = {color: 'red'};
    symbol = '-';
  }


  return (
    <Accordion sx={{width: '100%'}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Grid item xs>
          <Typography>{dayjs.utc(transaction.createdAt).format('DD.MM.YY HH:mm')}</Typography>
        </Grid>
        <Grid item xs>
          <Typography>{transaction.account.title}</Typography>
        </Grid>
        <Grid item xs>
          <Typography>{transaction.category.title}</Typography>
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