import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DisplayFlex from '../../components/StyledElems/DisplayFlex'
import { Input as InputUI, Box as BoxUI } from '../../components/UI'
import { Button } from '../../components/UI/Buttons'

const Wrapper = styled.div`
  text-align: center;
`
const LoginLayout = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled(BoxUI)`
  box-shadow: none;
  width: 430px;
  padding: 56px;
`

const Logo = styled.div`
  font-size: 82px;
  letter-spacing: 5px;
`

const Intro = styled.div`
font-size: 10px;
text-align: center;
letter-spacing: 1.5px;
text-transform: uppercase;
margin-bottom: 60px;
/* White / 60% */

color: rgba(255, 255, 255, 0.6);
`
const Input = styled(InputUI)`
  margin-bottom: 40px;
`

const SignIn = props => {
  const { onLogin } = props

  const [state, setState] = React.useState({})

  const onChange = ev => {
    const name = ev.target.name
    const value = ev.target.value
    return setState({ ...state, [name]: value })
  }
  return (
    <LoginLayout>
      <Wrapper>
        <Logo>
          Hive
        </Logo>
        <Intro>
          Property management system
        </Intro>
        <Box>
          <Input placeholder="Введите логин" name="username" onChange={onChange} />
          <Input type="password" placeholder="Введите пароль" name="password" onChange={onChange} />
          <DisplayFlex align="center" justify="space-between">
            <Button fullWidth={true} onClick={() => onLogin(state)}>войти</Button>
          </DisplayFlex>
        </Box>
      </Wrapper>
    </LoginLayout>
  )
}

SignIn.propTypes = {
  onLogin: PropTypes.func
}
export default SignIn
