import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import MenuIcon from '../../icons/Menu'
import * as ROUTES from '../../constants/routes'
import DisplayFlex from '../StyledElems/DisplayFlex'
import expireDocumentCookie from 'utils/expireDocumentCookie'
import {
  NavBar,
  IconWrapper,
  Title,
//  Notifications,
//  UserInfo
} from './components'
import MainMenu from './MainMenu'
import SubMenu from './SubMenu'
import { Power } from 'react-feather'
import {useDispatch} from 'react-redux'
import * as ACTIONS from 'constants/actionTypes'
import styled from "styled-components"
const DisplayTitle = styled(DisplayFlex)`
  min-width: 200px;
  max-width: 200px;
`
const Menu = props => {
  const { module, active, title } = props
  const history = useHistory()
  const goToMainMenu = () => history.push(ROUTES.ROOT_PATH)
  const dispatch = useDispatch()

  const onLogout = () => {
    expireDocumentCookie()
    dispatch({
      type: `${ACTIONS.LOGIN}_CLEAR`
    })
    history.replace(ROUTES.LOGIN_URL)
  }
  return (
    <>
      <NavBar>
        <DisplayTitle alignItems="center">
          <IconWrapper>
            <MenuIcon onClick={goToMainMenu} />
          </IconWrapper>
          <Title>{title}</Title>
        </DisplayTitle>

        <MainMenu module={module} active={active} />

        <DisplayFlex alignItems="center">
          <span onClick={onLogout}>
          <Power/>
          </span>
        </DisplayFlex>
      </NavBar>

      <SubMenu module={module} active={active} />
    </>
  )
}

Menu.propTypes = {
  module: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Menu
