import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAccountTypes} from "./accountTypesThunks";
import {selectAccountTypes, selectLoading} from "./accountTypesSlice";
import {Box, CircularProgress} from "@mui/material";
import AccountTypeCard from "./components/AccountTypeCard";

const AccountTypes = () => {
  const dispatch = useAppDispatch();
  const accountTypes = useAppSelector(selectAccountTypes);
  const loading = useAppSelector(selectLoading);


  useEffect(() => {
    dispatch(fetchAccountTypes());
  }, [dispatch]);

  return (
    <div>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : accountTypes.map((accountType) => {
        return <AccountTypeCard accountType={accountType}/>
      })}
    </div>
  );
};

export default AccountTypes;