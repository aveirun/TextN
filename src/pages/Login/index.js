import React from 'react';
import { Typography, Paper, Avatar, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { login } from '../../store/actions/user';
import Input from '../../components/Input';
import { Form } from 'react-final-form';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
    background: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  error: {
    color: 'red',
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form
          onSubmit={login}
          render={({ handleSubmit, submitError }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Input
                label="Email Address"
                name="email"
                type="email"
                autoFocus
                required
              />

              <Input
                label="Password"
                name="password"
                type="password"
                required
              />

              {submitError && (
                <div className={classes.error}>{submitError}</div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          )}
        />
      </Paper>
    </main>
  );
}

export default Login;
