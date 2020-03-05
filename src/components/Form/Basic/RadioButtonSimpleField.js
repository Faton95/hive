import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RadioButton } from '~/components/UI'

const Border = styled.div`
  margin-right: 10px;
  border-radius: 8px;
  padding: 5px 5px;
`

const RadioButtonSimpleField = props => {
  const { label, input } = props
  return (
    <Border>
      <RadioButton label={label} {...input} />
    </Border>
  )
}

RadioButtonSimpleField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  input: PropTypes.object
}

export default RadioButtonSimpleField
