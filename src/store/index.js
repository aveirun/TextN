import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import createRootReducer from './reducers'

export const history = createBrowserHistory()
const rootReducer = createRootReducer(history)

const enhancedCompose =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const middleware = [routerMiddleware(history)]
const enhancer = enhancedCompose(applyMiddleware(...middleware))

export const store = createStore(rootReducer, enhancer)

export const getCurrentState = () => store.getState()
export const dispatch = (...args) => store.dispatch(...args)
