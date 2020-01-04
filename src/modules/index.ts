import Hello from './Hello'
import SignIn from './sign-in'
import order from './order'

const Routes = store => [
  {
    exact: true,
    path: '/login',
    component: SignIn
  },
  ...order(store)
]

export default Routes
