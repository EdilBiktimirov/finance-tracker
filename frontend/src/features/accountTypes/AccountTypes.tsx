import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAccountTypes, removeAccountType} from "./accountTypesThunks";
import {selectAccountTypes, selectLoading} from "./accountTypesSlice";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import AccountTypeCard from "./components/AccountTypeCard";

const AccountTypes = () => {
  const dispatch = useAppDispatch();
  const accountTypes = useAppSelector(selectAccountTypes);
  const loading = useAppSelector(selectLoading);

  const deleteAccountType = async (id: string) => {
    await dispatch(removeAccountType(id));
    await dispatch(fetchAccountTypes());
  };

  useEffect(() => {
    dispatch(fetchAccountTypes());
  }, [dispatch]);

  return (
    <div>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
        </Box> :
        <>
          <Typography
            component={'h4'}
            variant={'h4'}
            sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}
          >
            Accounts types:
          </Typography>
          {accountTypes.map((accountType) => {
            return <AccountTypeCard
              accountType={accountType}
              onDeleteBtnClick={() => deleteAccountType(accountType._id)}
              key={accountType._id}
            />
          })}
        </>
      }
      {!accountTypes.length && <Button
          component={Link}
          to={'/add-new-account-type'}
          color="info"
          variant="outlined"
          size="small"
          sx={{fontWeight: 'bold'}}
      >
          Create new account type
      </Button>}
    </div>
  );
};

export default AccountTypes;