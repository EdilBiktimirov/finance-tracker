import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {fetchOneCategory} from "./categoriesThunks";
import {selectLoading, selectOneCategory} from "./categoriesSlice";
import {Box, CircularProgress} from "@mui/material";
import CategoriesForm from "./components/CategoriesForm";
import type {CategoryMutation} from "../../types";

const EditCategory = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as { id: string }
  const category = useAppSelector(selectOneCategory);
  const loading = useAppSelector(selectLoading);

  let editedCategory: CategoryMutation | undefined;

  if (category) {
    editedCategory = {
      title: category.title,
      type: category.type,
    }
  }

  useEffect(() => {
    dispatch(fetchOneCategory(id))
  }, [dispatch, id]);

  return (
    <div>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <CategoriesForm isEdit={true} editedCategory={editedCategory} categoryId={id}/>}
    </div>
  );
};

export default EditCategory;