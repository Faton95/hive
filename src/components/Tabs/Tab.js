import React from 'react'
import styled, { css } from 'styled-components'
import tabPropTypes from './tabPropTypes'

export const StyledTab = styled('div')`
  color: ${props => props.theme.input.labelColor};
  cursor: pointer;
  font-weight: 500;
  padding: 16px 0;
  &:not(:last-child) {
    margin-right: 35px;
  }
  ${props =>
    props.isActive &&
    css`
      color: ${props => props.theme.cube.textColor};
      position: relative;
      :after {
        background-color: ${props => props.theme.cube.textColor};
        border-radius: 6px;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        z-index: 1;
      }
    `}
`

const Tab = ({ label, ...props }) => {
  return <StyledTab {...props}>{label}</StyledTab>
}

Tab.propTypes = tabPropTypes

export default Tab
