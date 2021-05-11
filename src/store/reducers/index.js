import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user';
import postReducer from './post';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    post: postReducer,
  });

export default rootReducer;
