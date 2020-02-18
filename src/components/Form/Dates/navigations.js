import React from 'react'
import styled, { css } from 'styled-components'
import { ChevronLeft, ChevronRight } from 'react-feather'

const NavButton = styled('div')`
  position: absolute;
  & > svg {
    color: ${props => props.theme.cube.primaryColor};
    display:block;
  }
  ${props => {
    if (props.position === 'left') {
      return css`
        top: 20px;
        left: 20px;
      `
    }
    if (props.position === 'right') {
      return css`
          top: 20px;
          right: 20px;
        `
    }
  }}
`

export const navPrev = (
  <NavButton position="left">
    <ChevronLeft />
  </NavButton>
)

export const navNext = (
  <NavButton position="right">
    <ChevronRight />
  </NavButton>
)
