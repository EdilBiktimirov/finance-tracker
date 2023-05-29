import React from 'react';
import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';
import UserMenu from "./UserMenu";
import AnonMenu from "./AnonMenu";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/users/usersSlice";
import {SnackbarProvider} from "notistack";

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2, background: 'grey'}}>
      <SnackbarProvider />
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Finance tracker</Link>
          </Typography>
          <Grid item>
            {user ? (
              <UserMenu user={user}/>
            ) : (
              <AnonMenu/>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;