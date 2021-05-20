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
    '& > *': {},
  },
  inline: {
    display: 'flex',
  },
  button: {
    marginLeft: theme.spacing(),
    justifyContent: 'flex-end',
  },
}));

function ProfileSubscriptions() {
  const classes = useStyles();

  const subscriptions = [
    {
      img: 'https://99px.ru/sstorage/53/2016/06/tmb_169460_2461.jpg',
      name: 'Karina Gold',
      email: 'gold@gmail.com',
    },
  ];

  return (
    <List className={classes.root}>
      {subscriptions.map(sub => (
        <React.Fragment key={sub.email}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={sub.img} />
            </ListItemAvatar>
            <ListItemText
              primary={sub.name}
              secondary={
                <React.Fragment>
                  <Typography variant="body2" className={classes.inline}>
                    {sub.email}
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
              Unfollow
            </Button>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(ProfileSubscriptions);
