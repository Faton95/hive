import React from 'react'

const authWrapper = (Component) => {

  return props => {
    return <Component {...props}/>
  }
}

export default authWrapper
