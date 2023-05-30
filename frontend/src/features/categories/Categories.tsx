import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCategories, removeCategory} from "./categoriesThunks";
import {selectCategories, selectLoading} from "./categoriesSlice";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {Link} from "react-router-dom";
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
  }, [dispatch]);

  return (
    <div>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <>
        <Typography
          component={'h4'}
          variant={'h4'}
          sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}
        >
          Transactions categories:
        </Typography>
        {categories.map((category) => {
          return <CategoryCard
            category={category}
            onDeleteBtnClick={() => deleteCategory(category._id)}
            key={category._id}
          />
        })}
      </>
      }
      {!categories.length && <Button
          component={Link}
          to={'/add-new-category'}
          color="info"
          variant="outlined"
          size="small"
          sx={{fontWeight: 'bold'}}
      >
          Create new transaction category
      </Button>}
    </div>
  );
};

export default Categories;