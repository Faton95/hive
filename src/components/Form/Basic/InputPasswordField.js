import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel } from 'components/UI'
import { getFieldError } from 'utils/form'
import styled from "styled-components";
import Eye from "icons/view.svg";

const Wrapper = styled.div`
  position: relative;
`

const ShowHideButton = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  border-radius: 4px;
  cursor: pointer;
  height: 30px;
  width: 40px;
`
const InputPasswordField = ({ label, meta, input, rtl, ...rest }) => {
  const textAlign = rtl ? 'right' : 'left'

  const [show, setShow] = useState(false)
  return (
    <>
      <InputLabel>{label}</InputLabel>
    <Wrapper>
    <Input
      {...input}
      {...rest}
      style={{ textAlign }}
      type={show ? 'text' : 'password'}
      error={getFieldError(meta)}
    />
      <ShowHideButton onClick={() => setShow(!show)} src={Eye} alt="eye" />
    </Wrapper>
      </>
  )
}

InputPasswordField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string
}

export default InputPasswordField
