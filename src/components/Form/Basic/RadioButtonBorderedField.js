import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RadioButton } from '~/components/UI'

const Border = styled.div`
  border: 1px solid;
  border-color: ${props => (props.checked ? '#6770E6' : '#B4BFC9')};
  border-radius: 8px;
  padding: 18px 20px;
`
const Children = styled.div`
  padding-left: 26px;
`
const RadioButtonBordered = props => {
  const { label, value, children } = props

  return (
    <Border>
      <RadioButton value={value} label={label} />
      <Children>{children}</Children>
    </Border>
  )
}

RadioButtonBordered.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  children: PropTypes.any
}

export default RadioButtonBordered
