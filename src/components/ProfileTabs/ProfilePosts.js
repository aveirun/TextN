import React, { Fragment } from 'react';
import {
  Grid,
  Button,
  CardContent,
  CardActions,
  Container,
  Card,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      margin: theme.spacing(),
    },
  },

  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    // flexDirection: 'column',
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
    marginLeft: theme.spacing(),
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(),
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
                  <Button size="small" color="primary">
                    Удалить
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
