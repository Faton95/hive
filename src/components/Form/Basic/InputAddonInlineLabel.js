import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, InputError } from '~/components/UI'
import { getFieldError } from '~/utils/form'

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
  width: ${props => props.width} ;
`
const AddonLeft = styled('div')`
  align-items: center;
  padding-left: 10px;
  background-color: #f9fafb;
  border-right: 1px solid #e4e5eb;
  border-radius: ${props => {
    const radius = props.theme.input.borderRadius
    return `${radius} 0 0 ${radius}`
  }};
  color: #4e546a;
  display: flex;
  font-size: 14px;
  justify-content: center;
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  width: ${props => props.width};
  z-index: 2;
`

const InputField = styled(Input)`
  padding-left: calc(${props => props.paddingLeft} + 5px);
  padding-right: calc(${props => props.paddingRight} + 5px);
  text-align: right;
`
const InputAddon = props => {
  const { addon, label, meta, input, leftWidth, rightWidth, ...rest } = props
  return (
    <div>
      <InputContainer>
        <AddonLeft width={leftWidth}>{label}</AddonLeft>
        <InputField
          paddignLeft={leftWidth}
          paddingRight={rightWidth}
          {...input}
          {...rest}
        />
        <Addon width={rightWidth}>{addon}</Addon>
      </InputContainer>
      <InputError>{getFieldError(meta)}</InputError>
    </div>
  )
}

InputAddon.propTypes = {
  addon: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  leftWidth: PropTypes.string,
  rightWidth: PropTypes.string
}
InputAddon.defaultProps = {
  leftWidth: '145px',
  rightWidth: '85px'
}

export default InputAddon
