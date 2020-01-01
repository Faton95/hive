import React from 'react'
import Hello from './Hello'

const tester = store => [
  {
    exact: true,
    path: '/',
    component: () => <Hello name={'sdasOO'} />
  },
  {
    exact: true,
    path: '/src',
    component: () => <div>SRC COMPONENT</div>
  }
]
const Routes = store => [
  ...tester(store)
]

export default Routes
