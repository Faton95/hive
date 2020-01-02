import React, { useContext } from 'react'
import { path } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronDown, LogOut } from 'react-feather'
import * as ROUTES from '~/constants/routes'
import { setCookie } from '~/utils/cookie'
import { logOutAction } from '~/modules/auth/actions'
import { useUser } from '~/components/Hooks'
import NotifyContext from '~/components/Notify/NotifyContext'
import { Dropdown, DropdownItem } from '~/components/UI'

const Container = styled('div')`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-left: 42px;
  & * {
    pointer-events: none; 
  }
  & > svg {
    color: #2c3a50;
    margin-left: 5px;
    stroke-width: 3;
    transition: ${props => props.theme.cube.transition};
    transform: rotate(${props => props.isOpen ? '180deg' : '0'});
  }
`

const UserName = styled('div')`
  margin-right: 5px;
  color: #2c3a50;
`

const Photo = styled('div')`
  height: 33px;
  width: 33px;
  background: #edeef4;
  border-radius: 50%;
`

const UserInfo = props => {
  const userData = useUser()
  const dispatch = useDispatch()
  const history = useHistory()
  const { socket } = useContext(NotifyContext)

  const username = path(['data', 'username'], userData)

  const onLogOut = () => dispatch(logOutAction())
    .then(() => {
      history.replace(ROUTES.SIGN_IN_PATH)
      setCookie('refreshToken', '')
      socket.close(1000)
    })
    .then(() => {
      window.location.reload()
    })

  return (
    <Dropdown
      trigger={triggerProps => {
        const { innerRef, isOpen, onClick } = triggerProps
        return (
          <Container
            ref={innerRef}
            onClick={onClick}
            isOpen={isOpen}>
            <UserName>{username}</UserName>
            <Photo />
            <ChevronDown size={15} />
          </Container>
        )
      }}>
      <DropdownItem onClick={onLogOut}>
        <LogOut size={18} />Выйти из системы
      </DropdownItem>
    </Dropdown>
  )
}

UserInfo.propTypes = {}

export default UserInfo
