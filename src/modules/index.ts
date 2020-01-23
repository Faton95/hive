import SignIn from './sign-in'
import order from './order'
import settings from './settings'
import contract from './contract'
import Main from './Main'

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
  ...contract(store)
]

export default Routes
