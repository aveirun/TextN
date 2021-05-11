import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'flex',
  },
  button: {
    marginLeft: theme.spacing(),
    justifyContent: 'flex-end',
  },
}));

const followers = [
  {
    img: '/static/images/avatar/1.jpg',
    name: 'Ali Conors',
    email: 'ali@gmail.com',
  },
];

function ProfileFollowers() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {followers.map(follower => (
        <React.Fragment key={follower.email}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={follower.img} />
            </ListItemAvatar>
            <ListItemText
              primary={follower.name}
              secondary={
                <React.Fragment>
                  <Typography variant="body2" className={classes.inline}>
                    {follower.email}
                  </Typography>
                </React.Fragment>
              }
            />
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
            >
              Посмотреть
            </Button>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(ProfileFollowers);
