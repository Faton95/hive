import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { path } from 'ramda'
import styled from 'styled-components'
import { Minus, Plus } from 'react-feather'
import toNumber from '~/utils/toNumber'

const Container = styled('div')`
  align-items: center;
  background-color: white;
  border: ${props => props.theme.cube.border};
  border-radius: ${props => props.theme.input.borderRadius};
  display: flex;
  height: 38px;
  width: 110px;
`

const Nav = styled('div')`
  align-items: center;
  color: ${props => props.theme.cube.textColor};
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 100%;
  transition: ${props => props.theme.cube.transition};
  width: 32px;
  &:hover {
    color: ${props => props.theme.cube.primaryColor};
  }
`

const Input = styled('input')`
  border: none;
  color: inherit;
  flex-grow: 1;
  font-weight: 500;
  height: 100%;
  outline: none;
  text-align: center;
  width: 0;
`

const maxCount = 100

const Counter = props => {
  const { onChange, ...defaultProps } = props
  const [count, setCount] = useState(0)

  const change = val => {
    setCount(val)
    if (onChange) onChange(val)
  }

  const onChangeInput = event => {
    const value = path(['target', 'value'], event)
    const numberValue = toNumber(value)
    if (isNaN(numberValue)) {
      change(value)
    } else if (numberValue < maxCount) {
      if (numberValue === 0) {
        change(1)
      } else {
        change(numberValue)
      }
    } else {
      change(maxCount)
    }
  }

  const onSubstract = () => {
    if (count > 1) {
      change(count - 1)
    }
  }
  const onAdd = () => {
    if (count < maxCount) {
      change(count + 1)
    }
  }

  return (
    <Container {...defaultProps}>
      <Nav onClick={onSubstract}>
        <Minus size={18} />
      </Nav>

      <Input
        value={count}
        onChange={onChangeInput}
      />

      <Nav onClick={onAdd}>
        <Plus size={18} />
      </Nav>
    </Container>
  )
}

Counter.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Counter
