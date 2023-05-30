import React from 'react';
import {AccountType} from "../../../types";
import {Box, Typography} from "@mui/material";
import {apiUrl} from "../../../constants";
import {Link} from "react-router-dom";

interface Props {
  accountType: AccountType,
}

const AccountTypeCard: React.FC<Props> = ({accountType}) => {

  const cardImage = apiUrl + '/' + accountType.image;
  return (
    <Box border={1}>
      <img src={cardImage} alt={accountType.title}/>
      <Typography>{accountType.title}</Typography>
      <Link to={'/cabinet/edit-account-type/' + accountType._id}>Edit</Link>
    </Box>
  );
};

export default AccountTypeCard;