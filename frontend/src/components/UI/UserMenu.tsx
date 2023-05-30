import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Grid, Link, Menu, MenuItem} from '@mui/material';
import noAvatarUser from '../../assets/images/noAvatarUser.png'
import {useAppDispatch} from "../../app/hooks";
import {User} from "../../types";
import {logout} from "../../features/users/usersThunks";
import {apiUrl} from "../../constants";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const onMenuItemClick = (path: string) => {
    handleClose();
    navigate(path);
  };

  let avatar = noAvatarUser;

  if (user.googleId && user.avatar) {
    avatar = user.avatar;
  } else if (user.avatar) {
    avatar = apiUrl + '/' + user.avatar;
  }

  return (
    <>
      <Grid container>
        <Grid item>
          <Avatar alt={user?.displayName} src={avatar}/>
        </Grid>
        <Grid item>
          <Button
            onClick={handleClick}
            color="inherit"
          >
            Hello, {user.displayName}
          </Button>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          component={Link}
          onClick={() => onMenuItemClick('/add-new-account')}
        >
          Add account
        </MenuItem>
        <MenuItem
          component={Link}
          onClick={() => onMenuItemClick('/add-new-transaction')}
        >
          Add transaction
        </MenuItem>
        <MenuItem
          component={Link}
          onClick={() => onMenuItemClick('/add-new-account-type')}
        >
          Add account type
        </MenuItem>
        <MenuItem
          component={Link}
          onClick={() => onMenuItemClick('/add-new-category')}
        >
          Add transaction category
        </MenuItem>
        <MenuItem
          component={Link}
          onClick={() => onMenuItemClick('/cabinet/account-types')}
        >
          Account types
        </MenuItem>
        <MenuItem
          component={Link}
          onClick={() => onMenuItemClick('cabinet/categories')}
        >
          Transactions category
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
