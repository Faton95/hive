import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'

const Main: FunctionComponent = () => {
  return (
    <Redirect to="/order" />
  )
}

export default Main
