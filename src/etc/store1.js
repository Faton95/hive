import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { makeRootReducer } from './reducers'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, promise]

  // ======================================================
  // Browser console logger
  // ======================================================
  if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger')
    middleware.push(logger.createLogger({ collapsed: true }))
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(...middleware)
  )
  store.asyncReducers = {}

  return store
}
