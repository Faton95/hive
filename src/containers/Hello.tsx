import * as React from 'react'

export interface HelloProps { name: string }
const Hello = (props: HelloProps) => {
  return (
    <div>{props.name}</div>
  )
}

export default Hello
