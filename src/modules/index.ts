import SignIn from './sign-in'
import order from './order'
import settings from './settings'
import Main from './Main'
import client from './client'
import outsource from './outsource'

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
  ...client(store),
  ...outsource(store)
]

export default Routes
