import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import ArrowLeft from '../../icons/ArrowLeft'
import DisplayFlex from '../StyledElems/DisplayFlex'
import {
  NavBar,
  IconWrapper,
  Title,
//  Notifications,
//  UserInfo
} from './components'

const Menu = ({ title }) => {
  const history = useHistory()
  const goBack = () => history.goBack()
  return (
    <>
      <NavBar>
        <DisplayFlex alignItems={'center'}>
          <IconWrapper>
            <ArrowLeft onClick={goBack} />
          </IconWrapper>
          <Title>{title}</Title>
        </DisplayFlex>
        <DisplayFlex alignItems={'center'}>
          Notifications
          UserInfo
        </DisplayFlex>
      </NavBar>
    </>
  )
}

Menu.propTypes = {
  title: PropTypes.string.isRequired
}

export default Menu
