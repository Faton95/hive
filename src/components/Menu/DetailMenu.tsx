import React, { FunctionComponent } from 'react'

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

type Prop = {
  title: string;
}
const Menu: FunctionComponent<Prop> = ({ title }) => {
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

export default Menu
