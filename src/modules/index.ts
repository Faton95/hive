import SignIn from './sign-in'
import order from './order'
import settings from './settings'
import Main from './Main'
import client from './client'
import outsource from './outsource'
import * as ROUTES from 'constants/routes'

const Routes = store => [
  {
    exact: true,
    path: ROUTES.LOGIN_URL,
    component: SignIn
  },
  {
    exact: true,
    path: '/',
    component: Main
  },
  ...order(store),
  ...settings(store),
  ...client(store),
  ...outsource(store)
]

export default Routes
