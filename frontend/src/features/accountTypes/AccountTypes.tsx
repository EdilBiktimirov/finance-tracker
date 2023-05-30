import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAccountTypes, removeAccountType} from "./accountTypesThunks";
import {selectAccountTypes, selectLoading} from "./accountTypesSlice";
import {Box, Button, CircularProgress} from "@mui/material";
import AccountTypeCard from "./components/AccountTypeCard";
import {Link} from "react-router-dom";

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
      </Box> : accountTypes.map((accountType) => {
        return <AccountTypeCard accountType={accountType} onDeleteBtnClick={() => deleteAccountType(accountType._id)}/>
      })}

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