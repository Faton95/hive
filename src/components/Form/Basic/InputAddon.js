import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, InputLabel, InputError } from '~/components/UI'
import { getFieldError } from '~/utils/form'

const Container = styled('div')`
  
`

const InputContainer = styled('div')`
  position: relative;
`

const Addon = styled('div')`
  align-items: center;
  background-color: #f9fafb;
  border-left: 1px solid #e4e5eb;
  border-radius: ${props => {
    const radius = props.theme.input.borderRadius
    return `0 ${radius} ${radius} 0`
  }};
  color: #4e546a;
  display: flex;
  font-size: 14px;
  justify-content: center;
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  width: 80px;
`

const InputAddon = props => {
  const { addon, label, meta, input, ...rest } = props
  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <InputContainer>
        <Input
          {...input}
          {...rest}
        />
        <Addon>{addon}</Addon>
      </InputContainer>
      <InputError>{getFieldError(meta)}</InputError>
    </Container>
  )
}

InputAddon.propTypes = {
  addon: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
}

export default InputAddon
