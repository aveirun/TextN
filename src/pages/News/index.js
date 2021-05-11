import React, { Fragment } from 'react';
import {
  Grid,
  Button,
  CardContent,
  CardActions,
  Container,
  Card,
  CssBaseline,
  TextField,
} from '@material-ui/core';
import { addPost } from '../../store/actions/post';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: 'bolder',
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  text: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  small: {
    marginLeft: theme.spacing(),
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '50%',
    size: '50px',
    rating: 'pg',
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function News({ user }) {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Form
              onSubmit={addPost}
              render={({ handleSubmit }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 140 }}
                  />
                  <Button
                    className={classes.heroButtons}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Сохранить
                  </Button>
                </form>
              )}
            />
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="sm">
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <div className={classes.root}>
                      <Gravatar email="email" className={classes.small} />
                      {user.firstName}
                    </div>
                    <div className={classes.text}>
                      This is a media card. You can use this section to describe
                      the content.
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Like
                    </Button>
                    <Button size="small" color="primary">
                      Follow
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

export default connect(mapStateToProps)(News);
