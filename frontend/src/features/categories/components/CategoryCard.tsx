import React, {MouseEventHandler} from 'react';
import {Category} from "../../../types";
import {Box, Typography} from "@mui/material";
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
    <Box>
      <Typography>{category.title}</Typography>
      <Typography>{category.type}</Typography>
      <Link to={'/cabinet/edit-category/' + category._id}>Edit</Link>
      <LoadingButton
        color="error"
        size="small"
        variant="outlined"
        sx={{fontWeight: 'bold', mx: 'auto', mb: 2, display: 'block'}}
        loading={loadingRemoveBtn ? loadingRemoveBtn === category._id : false}
        onClick={onDeleteBtnClick}>
        Delete
      </LoadingButton>

    </Box>
  );
};

export default CategoryCard;