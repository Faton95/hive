import React from 'react'
import PropTypes from 'prop-types'
import { IconInput } from '~/components/UI'
import { getFieldError } from '~/utils/form'

const IconInputField = ({ label, meta, input, ...defaultProps }) => {
  return (
    <IconInput
      {...input}
      {...defaultProps}
      label={label}
      error={getFieldError(meta)}
    />
  )
}

IconInputField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
}

export default IconInputField
