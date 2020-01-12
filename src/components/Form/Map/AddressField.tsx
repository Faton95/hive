import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { FieldRenderProps } from 'react-final-form'
import { Input } from '../../UI'
import PinUI from '../../../icons/Map'

interface Props extends FieldRenderProps<string>{
    onIconClick: () => {};
}

const Button = styled.button.attrs(props => ({ type: 'button' }))`
  cursor: pointer;
  border: none;
  height: 52px;
  width: 52px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.primary.default};
  margin-left: 4px;
`
const InputWrap = styled.div`
  width: calc(100% - 56px);
`
const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`
const AddressField: FunctionComponent<Props> = props => {
  const { onIconClick, input } = props

  return (
    <Wrapper>
      <InputWrap>
        <Input label="Адрес доставки" {...input} />
      </InputWrap>
      <Button onClick={onIconClick}><PinUI /></Button>
    </Wrapper>

  )
}

export default AddressField
