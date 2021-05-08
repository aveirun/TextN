import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: theme.palette.primary.light,
  },
  title: {
    color: 'white',
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>404</h1>
      <h2 className={classes.title}>Page Not Found</h2>
    </div>
  );
}

export default NotFound;
