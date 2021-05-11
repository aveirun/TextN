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
    marginLeft: theme.spacing(),
  },
  button: {
    marginLeft: theme.spacing(),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function ProfilePosts({ user }) {
  const classes = useStyles();

  return (
    <Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="sm">
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card} justify="center">
                <Card className={classes.card}>
                  <CardContent>
                    <div className={classes.root}>
                      <Gravatar email={user.email} className={classes.small} />
                      <Typography gutterBottom variant="h6" component="h2">
                        {` ${user.firstName} ${user.lastName}`}
                      </Typography>
                    </div>
                    <Typography className={classes.text}>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className={classes.button}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </Fragment>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(ProfilePosts);
