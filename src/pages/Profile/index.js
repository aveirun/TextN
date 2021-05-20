import React from 'react';
import {
  Container,
  CircularProgress,
  Typography,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import ProfileTabs from '../../components/ProfileTabs';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';

import { useParams } from 'react-router-dom';
import { getAnotherUser, subscribe } from '../../store/actions/user';
import Gravatar from 'react-gravatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderRadius: '100%',
    size: '100px',
    rating: 'pg',
  },
  paper: {
    display: 'block',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Profile({ user, anotherUser }) {
  const classes = useStyles();

  const params = useParams();
  const anotherUserID = params.id;
  const selectedUser = anotherUserID ? anotherUser : user;

  React.useEffect(() => {
    if (anotherUserID) {
      getAnotherUser(anotherUserID);
    }
  }, [anotherUserID]);

  if (!selectedUser) {
    return (
      <div id="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <main>
        <Container maxWidth="sm">
          <div className={classes.root}>
            <Gravatar className={classes.large} email={selectedUser.email} />
            <div>
              <Typography variant="h5">{selectedUser.firstName}</Typography>
              <Typography variant="h6">{selectedUser.lastName}</Typography>
            </div>
            <div>
              {anotherUserID && (
                <Button
                  onClick={() => subscribe(anotherUserID)}
                  variant="contained"
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
          <ProfileTabs isAnotherUser={!!anotherUserID} />
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
  anotherUser: state.user.anotherUser,
});

export default connect(mapStateToProps)(Profile);
