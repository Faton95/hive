
import React from 'react'
import { path } from 'ramda'

const RadioGroupField = props => {
  const {
    children,
    input: { value, checked, ...input }
  } = props

  const isChecked = v => v === value

  const formattedChild = React.Children.map(children, child => {
    const check = isChecked(path(['props', 'value'], child))
    return React.cloneElement(child, {
      ...input,
      checked: check,
      isActive: check
    })
  })

  return <>{formattedChild}</>
}

export default RadioGroupField
