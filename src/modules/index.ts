import SignIn from './sign-in'
import order from './order'
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
  ...order(store)
]

export default Routes
