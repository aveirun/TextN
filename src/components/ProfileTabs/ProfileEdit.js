import React from 'react';
import { Button, Card } from '@material-ui/core';
import Input from '../../components/Input';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { editProfile } from '../../store/actions/user';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  form: {
    margin: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  error: {
    color: 'red',
  },
}));

function ProfileEdit({ user }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Form
        initialValues={user}
        onSubmit={editProfile}
        render={({ handleSubmit, submitError }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Input label="First name" name="firstName" required />
            <Input label="Last name" name="lastName" required />
            <Input label="Location" name="location" />
            <Input name="birthDate" type="date" label="Birth date" required />

            {submitError && <div className={classes.error}>{submitError}</div>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Сохранить
            </Button>
          </form>
        )}
      />
    </Card>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(ProfileEdit);
