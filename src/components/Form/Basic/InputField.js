import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components/UI'
import { getFieldError } from 'utils/form'
import isEqual from 'react-fast-compare'
const InputField = ({ label, meta, input, rtl, ...rest }) => {
  const textAlign = rtl ? 'right' : 'left'
  return (
    <Input
      {...input}
      {...rest}
      label={label}
      style={{ textAlign }}
      error={getFieldError(meta)}
    />
  )
}

InputField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string
}

export default React.memo(InputField, isEqual)
