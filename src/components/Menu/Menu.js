import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import MenuIcon from '../../icons/Menu'
import { ROOT_PATH } from '../../constants/routes'
import DisplayFlex from '../StyledElems/DisplayFlex'
import {
  NavBar,
  IconWrapper,
  Title,
//  Notifications,
//  UserInfo
} from './components'
import MainMenu from './MainMenu'
import SubMenu from './SubMenu'

const Menu = props => {
  const { module, active, title } = props
  const history = useHistory()
  const goToMainMenu = () => history.push(ROOT_PATH)

  return (
    <>
      <NavBar>
        <DisplayFlex alignItems={'center'}>
          <IconWrapper>
            <MenuIcon onClick={goToMainMenu} />
          </IconWrapper>
          <Title>{title}</Title>
        </DisplayFlex>

        <MainMenu module={module} active={active} />

        <DisplayFlex alignItems={'center'}>
          Not
          &nbsp;User
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
