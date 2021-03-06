import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RadioButton } from 'components/UI'

const Border = styled.div`
  border: 1px solid;
  border-color: ${props => (props.checked ? '#6770E6' : '#B4BFC9')};
  border-radius: 8px;
  padding: 18px 20px;
  transition: max-height 300ms;
  overflow: hidden;
  overflow-y: auto;
  max-height: ${props => props.checked ? '700px' : '56px'};
  > label {
  margin-bottom: ${props => (props.checked ? '15px' : '0')};
  }
`
const Children = styled.div`
  position: relative;
  padding-left: 26px;
`
const RadioButtonBordered = props => {
  const { label, children, input, disabled } = props

  return (
    <Border checked={input.checked}>
      <RadioButton label={label} {...input} disabled={disabled} />
      {input.checked && children && <Children>{children}</Children>}
    </Border>
  )
}

RadioButtonBordered.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  input: PropTypes.object
}

RadioButtonBordered.defaultProps = {
  disabled: false
}
export default RadioButtonBordered
