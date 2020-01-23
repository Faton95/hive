import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { prop } from 'ramda'
import styled, { css } from 'styled-components'
import { Checkbox } from 'ui-cubic'
import { InputLabel } from 'components/UI'

const CheckboxWrapper = styled('div')``

const Container = styled('div')`
  align-items: center;
  background-color: #fbfbfc;
  border: 1px solid #dee0e5;
  border-radius: ${props => props.theme.input.borderRadius};
  cursor: pointer;
  display:flex;
  min-height: 52px;
  padding: 6px 20px;
  transition: ${props => props.theme.cube.transition};
  width: 100%;
  ${props => props.checked && css`
    background-color: #f5f6fd;
    border-color: ${props => props.theme.cube.primaryColor};
  `}
`

const StyledCheckbox = styled(Checkbox)`
  pointer-events: none;
`

const toBoolean = value =>
  value === 'true' || value === true

const CheckboxBordered = props => {
  const { input, label, ...rest } = props

  const checked = toBoolean(prop('checked', input))

  const fieldLabel = prop('field', label)
  const checkboxLabel = prop('checkbox', label)

  const onChange = () => {
    if (input && input.onChange) {
      input.onChange(!checked)
    }
    if (props.onChange) {
      props.onChange(!checked)
    }
  }

  return (
    <CheckboxWrapper {...rest}>
      <InputLabel>{fieldLabel}</InputLabel>
      <Container onClick={onChange} checked={checked}>
        <StyledCheckbox
          label={checkboxLabel}
          checked={checked}
          value={checked}
        />
      </Container>
    </CheckboxWrapper>
  )
}

CheckboxBordered.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.shape({
    field: PropTypes.string,
    checkbox: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func
}

export default CheckboxBordered
