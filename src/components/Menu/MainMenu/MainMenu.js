import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import {pipe, prop, map, last, split, uniq} from 'ramda'
import { Link } from 'react-router-dom'
import mapIndexed from '../../../utils/mapIndexed'
import menus from '../../../constants/menus'
import {useUserPerms} from 'hooks'

const SubMenuItems = styled(({ isActive, ...props }) => <Link {...props} />)`
  border-radius: ${props => props.theme.input.borderRadius};
  color: ${props => props.theme.input.labelColor};
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  font-size: 15px;
  padding: 12px 15px;
  margin-right: 15px;
  text-decoration: none;
  transition: ${props => props.theme.cube.transition};
  :last-child {
    margin-right: 0;
  }

  :hover {
    background-color: #f1f3f5;
  }

  ${props => props.isActive && css`
    background-color: #f1f3f5;
    color: ${props => props.theme.cube.textColor};
  `}
`

const MainMenu = ({ active }) => {
  const [userPerms, isSuperUser] = useUserPerms()
  const permKeys = pipe(
    map(pipe(split('_'), last)),
    uniq
  )(userPerms)

  return (
    <div>
      {mapIndexed((item, index) => {
        const title = prop('title', item)
        const url = prop('url', item)
        const key = prop('key', item)
        const isActive = active === key

        if(isSuperUser || permKeys.includes(key)){
          return (
            <SubMenuItems
              key={index}
              to={url}
              isActive={isActive}
            >
              {title}
            </SubMenuItems>
          )
        }
        return null

      }, menus)}
    </div>
  )
}

MainMenu.propTypes = {
  active: PropTypes.string.isRequired
}

export default MainMenu
