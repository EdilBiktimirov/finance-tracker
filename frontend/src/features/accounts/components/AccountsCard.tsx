import React, {MouseEventHandler} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Account} from "../../../types";
import {useAppSelector} from "../../../app/hooks";
import {apiUrl} from "../../../constants";
import {LoadingButton} from "@mui/lab";
import {selectLoadingRemoveAccount} from "../accountsSlice";
import {useNavigate} from "react-router-dom";

interface Props {
  account: Account;
  onDeleteBtnClick: MouseEventHandler;
}

const AccountsCard: React.FC<Props> = ({account, onDeleteBtnClick}) => {
  const navigate = useNavigate();
  const loadingRemoveBtn = useAppSelector(selectLoadingRemoveAccount);
  let cardImage = apiUrl + '/' + account.accountType.image;

  return (
    <Grid item>
      <Card sx={{width: 400, height: '100%'}}>
        <CardActionArea onClick={() => navigate('/accounts/' + account._id)}>
          <CardMedia
            component="img"
            height="300"
            image={cardImage}
            alt={account.accountType.title}
          />
          <CardContent sx={{mb: 'auto'}}>
            <Typography variant="h6" sx={{color: "grey", fontWeight: "bold", textAlign: "center", mb: 2}}>
              {account.title}
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6" sx={{color: "green", fontWeight: "bold"}}>
                  {account.amount + ' KGS'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  {account.accountType.title}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>

        <Grid item>
          <LoadingButton
            color="error"
            size="small"
            variant="outlined"
            sx={{fontWeight: 'bold', mx: 'auto', mb: 2, display: 'block'}}
            loading={loadingRemoveBtn ? loadingRemoveBtn === account._id : false}
            onClick={onDeleteBtnClick}>
            Delete
          </LoadingButton>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AccountsCard;