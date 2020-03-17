import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components/UI'
import { getFieldError } from 'utils/form'
import styled from 'styled-components'
import Eye from 'icons/view.svg'

const Wrapper = styled.div`
  position: relative;
`

const HideButton = styled.img`
  position: absolute;
  top: 35px;
  right: 20px;
  border-radius: 4px;
  cursor: pointer;
  height: 30px;
  width: 40px;
`

const PASSWORD = 'password'
const TEXT = 'text'
const InputPasswordField = ({ label, meta, input, rtl, ...rest }) => {
  const textAlign = rtl ? 'right' : 'left'

  const [show, setShow] = useState(false)
  const onToggle = () => setShow(!show)
  return (
    <>
      <Wrapper>
        <Input
          {...input}
          {...rest}
          label={label}
          style={{ textAlign }}
          type={show ? TEXT : PASSWORD}
          error={getFieldError(meta)}
        />
        <HideButton onClick={onToggle} src={Eye} alt='eye' />
      </Wrapper>
    </>
  )
}

InputPasswordField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  rtl: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string
}

export default InputPasswordField
