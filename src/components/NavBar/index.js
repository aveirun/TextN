import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/user';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    fontSize: '1rem',
    fontWeight: 'medium',
    margin: theme.spacing(2),

    '&:visited': {
      color: 'white',
    },

    '&:hover': {
      color: 'blue',
      transitionDuration: '0.3s',
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '50%',
    rating: 'pg',
  },
}));

function NavBar({ user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/profile">
              Profile
            </Link>

            <Link className={classes.link} to="/news">
              Feed
            </Link>
          </Typography>

          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Gravatar email={user.email} className={classes.small} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={!!anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(NavBar);
