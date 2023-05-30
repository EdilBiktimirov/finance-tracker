import React, {MouseEventHandler} from 'react';
import {Category} from "../../../types";
import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useAppSelector} from "../../../app/hooks";
import {selectLoadingRemoveCategory} from "../categoriesSlice";

interface Props {
  category: Category;
  onDeleteBtnClick: MouseEventHandler;
}

const CategoryCard: React.FC<Props> = ({category, onDeleteBtnClick}) => {
  const loadingRemoveBtn = useAppSelector(selectLoadingRemoveCategory);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{p: 2, mb: 2, border: 1, borderRadius: '8px', boxShadow: 1}}>
      <Grid item sx={{minWidth: '200px'}}>
        <Typography>{category.title}</Typography>
      </Grid>

      <Grid item >
        <Typography>{category.type}</Typography>
      </Grid>

      <Grid item>
        <Button
          component={Link}
          to={'/cabinet/edit-category/' + category._id}
          color="info"
          variant="outlined"
          size="small"
          sx={{mb: 2, fontWeight: 'bold'}}
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