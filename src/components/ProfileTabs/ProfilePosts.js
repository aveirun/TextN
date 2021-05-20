import React, { Fragment } from 'react';
import {
  Grid,
  Button,
  CardContent,
  CardActions,
  Container,
  Card,
  Typography,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import Gravatar from 'react-gravatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  card: {
    height: '100%',
    flexGrow: 1,
  },

  cardContent: {
    flexGrow: 1,
  },
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '50%',
    size: '50px',
    rating: 'pg',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(),
    marginLeft: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(),
  },
}));

const cards = [{}];

function ProfilePosts({ user }) {
  const classes = useStyles();

  return (
    <Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="sm">
          {cards.map(card => (
            <Grid item key={card} className={classes.root}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.root}>
                    <Gravatar email="email" className={classes.small} />
                    <Typography className={classes.text}>
                      {user.firstName}
                    </Typography>
                  </div>
                  <div className={classes.text}>{card.message}</div>
                </CardContent>
                <CardActions className={classes.root}>
                  <Button
                    size="small"
                    color="primary"
                    className={classes.button}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Container>
      </main>
    </Fragment>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(ProfilePosts);
