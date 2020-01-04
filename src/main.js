import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './etc/store'
import './root.css'
// ======================================================
// Store Initialization
// ======================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

const MOUNT_NODE = document.getElementById('app')

const render = () => {
  const App = require('./App').default
  const routes = require('./modules').default
  ReactDOM.render(
    <App store={store} routes={routes(store)} />,
    MOUNT_NODE
  )
}

// ======================================================
// Configuration HMR only run when files change
// ======================================================
if (__DEV__) {
  if (module.hot) {
    module.hot.accept(['./App', './modules'], () =>
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Run app
render()
