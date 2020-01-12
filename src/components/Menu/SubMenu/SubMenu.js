import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import menus from '../../../constants/menus'
import mapIndexed from '../../../utils/mapIndexed'

const borderAnimate = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: ${props => props.theme.input.borderRadius};
  display: flex;
  line-height: 44px;
  padding: 0 20px;
  margin: 20px 0;
  width: fit-content;
`

const SubMenuItem = styled(NavLink)`
  color: #4E546A;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: block;
  position: relative;
  text-decoration: none;
  transition: ${props => props.theme.cube.transition};

  :not(:last-child) {
    margin-right: 32px;
  }

  :hover {
    color: ${props => props.theme.cube.colorOrange};
  }

  :after {
    background-color: ${props => props.theme.cube.colorOrange};
    border-radius: 4px;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    transition: all 150ms;
    transform: scaleX(0);
  }
  &.active {
    color: ${props => props.theme.cube.colorOrange};
    :after {
      animation: ${borderAnimate} 200ms forwards;
    }
  }
`

const SubMenu = ({ active }) => {
  const childMenus = R.pipe(
    R.find(item => R.prop('key', item) === active),
    R.prop('children')
  )(menus)

  if (R.isEmpty(childMenus) || R.isNil(childMenus)) {
    return null
  }

  return (
    <Wrapper>
      {mapIndexed((item, index) => {
        const title = R.prop('title', item)
        const url = R.prop('url', item)

        return (
          <SubMenuItem
            to={url}
            activeClassName="active"
            key={index}
          >
            {title}
          </SubMenuItem>
        )
      }, childMenus)}
    </Wrapper>
  )
}

SubMenu.propTypes = {
  active: PropTypes.string.isRequired
}

export default SubMenu
