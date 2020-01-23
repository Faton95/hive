import React from 'react'
import prop from 'ramda/es/prop'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DisplayFlex from './DisplayFlex'

const Field = styled('div')`
  width: 50%;
  &:first-child {
    padding-right: 30px;
  }
  &:last-child:not(:first-child) {
    border-left: 1px solid #e1e2ea;
    padding-left: 30px;
  }
`

const DoubleField = ({ children, ...props }) => {
  return (
    <DisplayFlex {...props}>
      {React.Children.map(children, (child, key) => {
        const content = child
          ? React.cloneElement(child, prop('props', child))
          : null
        return child && <Field key={key}>{content}</Field>
      })}
    </DisplayFlex>
  )
}

DoubleField.propTypes = {
  children: PropTypes.node.isRequired
}

export default DoubleField
