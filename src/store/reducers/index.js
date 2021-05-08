import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './user'

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  })

export default rootReducer
