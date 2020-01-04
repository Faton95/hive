import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Label = styled('div')`
  align-items: center;
  color: ${props => props.theme.input.labelColor};
  display: flex;
  font-size: 14px;
  line-height: 20px;
  ${props => props.withBackground && (
    css`
      background-color: #f1f3f5;
      border-radius: 50px;
      min-height: 25px;
      padding: 0 10px;
    `
  )}
`

const Content = styled('span')`
  color: ${props => props.theme.cube.textColor};
  margin-left: 4px;
`

const DetailTopLabel = props => {
  const { label, children, withBackground, ...defaultProps } = props

  return (
    <Label withBackground={withBackground} {...defaultProps}>
      {label}
      <Content>{children}</Content>
    </Label>
  )
}

DetailTopLabel.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  withBackground: PropTypes.bool,
}

export default DetailTopLabel
