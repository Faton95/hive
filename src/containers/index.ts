import Hello from './Hello'

const tester = store => [
  {
    exact: true,
    path: '/',
    component: Hello
  }
]
const Routes = store => [
  ...tester(store)
]

export default Routes
