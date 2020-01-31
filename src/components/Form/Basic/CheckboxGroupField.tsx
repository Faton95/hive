import React, {FunctionComponent} from 'react'
import {CheckboxGroup, Checkbox} from 'components/UI'
import {TIdName, Merge} from 'types'
import {FieldRenderProps} from 'react-final-form'
import {prop} from "ramda";
import styled from "styled-components";
type Props = Merge<FieldRenderProps<Array<number>, HTMLInputElement>, {
  items?: TIdName[],
  label?: string,
  mode?: string
}>

interface SelectAdapterProps extends HTMLInputElement {
  label?: string;
  items: TIdName[];
}

const StyledCheckbox = styled(Checkbox)`
  width: calc(33% - 25px);
  vertical-align: top;
  display: inline-block;
`


const CheckboxGroupField: FunctionComponent<Props> = props => {
  const {
    items,
    label,
    mode,
    input: { value, checked, ...input },
  } = props

  return (
    <CheckboxGroup
      label={label}
      mode={mode}
      value={value}
      onChange={input.onChange}>
      {items.map(checkbox => (
        <StyledCheckbox
          onChange={() => null}
          key={checkbox.id}
          value={checkbox.id}
          label={checkbox.name}
          checked={value.includes(checkbox.id)}/>
      ))}
    </CheckboxGroup>
  )
}

CheckboxGroupField.defaultProps = {
  items: [],
  mode: 'inline'
}

export default CheckboxGroupField
