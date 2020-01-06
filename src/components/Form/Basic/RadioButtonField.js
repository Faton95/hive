import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RadioButton } from '~/components/UI'

const Border = styled.div`
  background-color: ${props => (props.checked ? '#F5F6FD' : '#FBFBFC')};
  border-radius: 8px;
  padding: 18px 20px;
`

const RadioButtonField = props => {
  const { label, input } = props
  const checked = input.checked || false
  return (
    <Border checked={checked}>
      <RadioButton label={label} {...input} />
    </Border>
  )
}

RadioButtonField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  input: PropTypes.object
}

export default RadioButtonField
