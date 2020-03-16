import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import { DisplayFlex, FieldWrapper } from '../../components/StyledElems'
import { Input as InputUI, Box as BoxUI, InputError } from '../../components/UI'
import { InputPasswordField, InputField } from '../../components/Form'
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
  text-align: left;
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

  return (
    <LoginLayout>
      <Wrapper>
        <Logo>Hive</Logo>
        <Intro>Property management system</Intro>
        <Form
          onSubmit={onLogin}
          render={formikProps => {
            return (
              <form onSubmit={formikProps.handleSubmit}>
                <Box>
                  <FieldWrapper data-cy='username-wrap'>
                    <Field
                      name='username'
                      component={InputField}
                      label='Username'
                      placeholder='Введите логин'
                    />
                  </FieldWrapper>
                  <FieldWrapper data-cy='password-wrap'>
                    <Field
                      label='Password'
                      name='password'
                      placeholder='Введите пароль'
                      component={InputPasswordField}
                    />
                  </FieldWrapper>
                  {formikProps.submitError && (
                    <FieldWrapper data-cy='auth-error-wrapper'>
                      <InputError>{formikProps.submitError}</InputError>
                    </FieldWrapper>
                  )}
                  <DisplayFlex align='center' justify='space-between'>
                    <Button fullWidth type='submit' data-cy='submit'>
                      войти
                    </Button>
                  </DisplayFlex>
                </Box>
              </form>
            )
          }}
        />
      </Wrapper>
    </LoginLayout>
  )
}

SignIn.propTypes = {
  onLogin: PropTypes.func
}
export default SignIn
