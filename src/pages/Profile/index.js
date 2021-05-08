import React from 'react';
import { Paper, Avatar, CircularProgress, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ProfileTabs from '../../components/ProfileTabs';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

function Profile({ user }) {
  const classes = useStyles();

  if (!user) {
    return (
      <div id="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Paper>
        <div className={classes.root}>
          <Avatar
            alt="Remy Sharp"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg"
            className={classes.large}
          />
          <div>
            <Typography variant="h5">{user.firstName}</Typography>
            <Typography variant="h6">{user.lastName}</Typography>
          </div>
        </div>
      </Paper>
      <Paper>
        <ProfileTabs />
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(Profile);
