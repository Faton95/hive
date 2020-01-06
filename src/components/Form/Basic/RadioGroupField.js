/* eslint-disable */
import { RadioGroup, RadioButtonBordered } from '~/components/UI'
import styled from 'styled-components'
import React from 'react'
import { path } from 'ramda'

const RadioButton = styled(RadioButtonBordered)``
const RadioGroupField = props => {
  const {
    children,
    input: { value, checked, ...input },
    meta
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

  return <React.Fragment>{formattedChild}</React.Fragment>
}

export default RadioGroupField
