import React, {MouseEventHandler} from 'react';
import {selectLoadingRemoveCategory} from "../categoriesSlice";
import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useAppSelector} from "../../../app/hooks";
import type {Category} from "../../../types";

interface Props {
  category: Category;
  onDeleteBtnClick: MouseEventHandler;
}

const CategoryCard: React.FC<Props> = ({category, onDeleteBtnClick}) => {
  const loadingRemoveBtn = useAppSelector(selectLoadingRemoveCategory);
  let categoryColor: string;

  if (category.type === 'expenses') {
    categoryColor = 'red';
  } else {
    categoryColor = 'green';
  }

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{p: 2, mb: 2, border: 1, borderRadius: '8px', boxShadow: 1, background: '#F8F6F4'}}>
      <Grid item sx={{minWidth: '200px'}}>
        <Typography sx={{fontWeight: 'bolder'}}>{category.title}</Typography>
      </Grid>
      <Grid item>
        <Typography sx={{color: categoryColor}}>{category.type}</Typography>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          to={'/cabinet/edit-category/' + category._id}
          color="info"
          variant="outlined"
          size="small"
          sx={{mb: 2, fontWeight: 'bold', width: '100%'}}
        >
          Edit
        </Button>
        <LoadingButton
          color="error"
          size="small"
          variant="outlined"
          sx={{fontWeight: 'bold', mx: 'auto', display: 'block'}}
          loading={loadingRemoveBtn ? loadingRemoveBtn === category._id : false}
          onClick={onDeleteBtnClick}>
          Delete
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CategoryCard;