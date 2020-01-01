import React, { FunctionComponent } from 'react'

export interface HelloProps { name: string }

const Hello: FunctionComponent<HelloProps> = props => {
  return (
    <div>{props.name}</div>
  )
}

export default Hello
