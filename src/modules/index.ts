import SignIn from './sign-in'
import order from './order'
import settings from './settings'
import Main from './Main'
import client from './client'

const Routes = store => [
  {
    exact: true,
    path: '/login',
    component: SignIn
  },
  {
    exact: true,
    path: '/',
    component: Main
  },
  ...order(store),
  ...settings(store),
  ...client(store)
]

export default Routes
