import React, {useEffect} from 'react';
import {fetchOneAccountType} from "./accountTypesThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {selectLoading, selectOneAccountType} from "./accountTypesSlice";
import {Box, CircularProgress} from "@mui/material";
import AccountTypesForm from "./components/AccountTypesForm";
import type {AccountTypeMutation} from "../../types";

const EditAccountTypes = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const currentAccountType = useAppSelector(selectOneAccountType);
  const loading = useAppSelector(selectLoading);

  let editedAccountType: AccountTypeMutation | undefined;

  if (currentAccountType) {
     editedAccountType = {
      title: currentAccountType.title,
      image: currentAccountType.image,
    }
  }

  useEffect(() => {
    dispatch(fetchOneAccountType(id))
  }, [dispatch, id]);

  return (
    <div>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <AccountTypesForm isEdit={true} accountTypeId={id} editedAccountType={editedAccountType}/>}
    </div>
  );
};

export default EditAccountTypes;