import React from 'react'
import Hello from './Hello.tsx'

const tester = store => [
  {
    exact: true,
    path: '/',
    component: () => <Hello name={'NasdasdasOO'} />
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
