import React, {MouseEventHandler} from 'react';
import {AccountType} from "../../../types";
import {Box, Typography} from "@mui/material";
import {apiUrl} from "../../../constants";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useAppSelector} from "../../../app/hooks";
import {selectLoadingRemoveAccountType} from "../accountTypesSlice";


interface Props {
  accountType: AccountType,
  onDeleteBtnClick: MouseEventHandler,
}

const AccountTypeCard: React.FC<Props> = ({accountType, onDeleteBtnClick}) => {
  const loadingRemoveBtn = useAppSelector(selectLoadingRemoveAccountType);
  const cardImage = apiUrl + '/' + accountType.image;

  return (
    <Box border={1}>
      <img src={cardImage} alt={accountType.title}/>
      <Typography>{accountType.title}</Typography>
      <Link to={'/cabinet/edit-account-type/' + accountType._id}>Edit</Link>
      <LoadingButton
        color="error"
        size="small"
        variant="outlined"
        sx={{fontWeight: 'bold', mx: 'auto', mb: 2, display: 'block'}}
        loading={loadingRemoveBtn ? loadingRemoveBtn === accountType._id : false}
        onClick={onDeleteBtnClick}>
        Delete
      </LoadingButton>
    </Box>
  );
};

export default AccountTypeCard;