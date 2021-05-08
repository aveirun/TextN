import React from 'react';
import { Button } from '@material-ui/core';
import Input from '../../components/Input';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { editProfile } from '../../store/actions/user';
import { makeStyles } from '@material-ui/core/styles';

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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

function ProfileEdit({ user }) {
  const classes = useStyles();

  return (
    <Form
      initialValues={user}
      onSubmit={editProfile}
      render={({ handleSubmit, submitError }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Input label="First name" name="firstName" required />

          <Input label="Last name" name="lastName" required />

          <Input label="Location" name="location" required />

          <Input name="birthDate" type="date" label="Birth date" required />

          {submitError && <div className={classes.error}>{submitError}</div>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      )}
    />
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(ProfileEdit);
