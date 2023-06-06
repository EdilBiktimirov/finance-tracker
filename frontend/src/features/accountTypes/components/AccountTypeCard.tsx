import React, {MouseEventHandler} from 'react';
import {selectLoadingRemoveAccountType} from "../accountTypesSlice";
import {Button, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../../constants";
import {Link} from 'react-router-dom';
import {LoadingButton} from "@mui/lab";
import {useAppSelector} from "../../../app/hooks";
import type {AccountType} from "../../../types";

interface Props {
  accountType: AccountType,
  onDeleteBtnClick: MouseEventHandler,
}

const AccountTypeCard: React.FC<Props> = ({accountType, onDeleteBtnClick}) => {
  const loadingRemoveBtn = useAppSelector(selectLoadingRemoveAccountType);
  const cardImage = apiUrl + '/' + accountType.image;

  return (
    <Grid container
          justifyContent="space-between"
          alignItems="center"
          sx={{p: 1, mb: 2, border: 1, borderRadius: '8px', boxShadow: 1}}>
      <Grid item sx={{width: '200px', height: 'auto'}}>
        <img src={cardImage} alt={accountType.title} style={{width: '100%', height: 'auto'}}/>
      </Grid>
      <Grid item>
        <Typography sx={{fontWeight: 'bolder'}}>{accountType.title}</Typography>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          to={'/cabinet/edit-account-type/' + accountType._id}
          color="info"
          variant="outlined"
          size="small"
          sx={{mb: 2, fontWeight: 'bold', width: '100%'}}
        >
          Edit
        </Button>
        <LoadingButton
          color="error"
          size="small"
          variant="outlined"
          sx={{fontWeight: 'bold', mx: 'auto', display: 'block'}}
          loading={loadingRemoveBtn ? loadingRemoveBtn === accountType._id : false}
          onClick={onDeleteBtnClick}>
          Delete
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default AccountTypeCard;