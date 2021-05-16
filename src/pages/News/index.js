import React, { Fragment } from 'react';
import {
  Grid,
  Button,
  CardContent,
  CardActions,
  Container,
  Card,
  CssBaseline,
  Typography,
} from '@material-ui/core';
import { addPost } from '../../store/actions/post';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import Input from '../../components/Input';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      margin: theme.spacing(),
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
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(),
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

const posts = [{}];

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
                  <Input
                    name="message"
                    variant="outlined"
                    placeholder="What's up?"
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
          {posts.map(p => (
            <Grid item key={p.id} className={classes.root}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.root}>
                    <Gravatar email="email" className={classes.small} />
                    <Typography
                      className={classes.text}
                    >{` ${user.firstName} ${user.lastName}`}</Typography>
                  </div>
                  <div className={classes.text}>{p.post}</div>
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
        </Container>
      </main>
    </Fragment>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(News);
