import React from 'react'
import { Field } from '../index'

const Fields = props => {
  const {
    names,
    subscription,
    fieldsState = {},
    children,
    originalRender
  } = props

  if (!names.length) {
    return (originalRender || children)(fieldsState)
  }
  const [name, ...rest] = names
  return (
    <Field name={name} subscription={subscription}>
      {fieldState => (
        <Fields
          names={rest}
          subscription={subscription}
          originalRender={originalRender || children}
          fieldsState={{ ...fieldsState, [name]: fieldState }}
        />
      )}
    </Field>
  )
}

export default Fields
