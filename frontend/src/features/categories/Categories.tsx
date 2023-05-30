import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCategories, removeCategory} from "./categoriesThunks";
import {selectCategories, selectLoading} from "./categoriesSlice";
import {Box, CircularProgress} from "@mui/material";
import CategoryCard from "./components/CategoryCard";

const Categories = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading)
  const categories = useAppSelector(selectCategories);

  const deleteCategory = async (id: string) => {
    await dispatch(removeCategory(id));
    await dispatch(fetchCategories());
  };


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])


  return (
    <div>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : categories.map((category) => {
        return <CategoryCard category={category} onDeleteBtnClick={() => deleteCategory(category._id)}/>
      })}
    </div>
  );
};

export default Categories;