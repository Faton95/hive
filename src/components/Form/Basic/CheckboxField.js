import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { prop } from 'ramda'
import styled, { css } from 'styled-components'
import { Checkbox } from 'ui-cubic'
import { InputLabel } from 'components/UI'

const StyledCheckbox = styled(Checkbox)`
  padding-left: 26px !important;

`

const CheckboxBordered = props => {
  const { input, label, ...rest } = props

  return (

    <StyledCheckbox
      label={label}
      {...input}
      {...rest}
    />
  )
}

CheckboxBordered.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default CheckboxBordered
