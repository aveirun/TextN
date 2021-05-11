import React, { useState, useEffect } from 'react';
import './styles.css';
import Profile from '../Profile';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../NotFound';
import { checkInitialized } from '../../store/actions/user';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../store';
import News from '../News';

const theme = createMuiTheme();

function App({ user }) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    checkInitialized().then(() => {
      setFirebaseInitialized(true);
    });
  }, []);

  if (!firebaseInitialized) {
    return (
      <div id="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {user ? (
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/news" component={News} />
            <Route path="/*" component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/*" component={Login} />
          </Switch>
        )}
      </MuiThemeProvider>
    </ConnectedRouter>
  );
}

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(App);
