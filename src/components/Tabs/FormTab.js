import React from 'react'
import PropTypes from 'prop-types'
import { filter, includes, isEmpty, keys, not, pipe } from 'ramda'
import styled, { css } from 'styled-components'
import { useFormState } from 'react-final-form'
import tabPropTypes from './tabPropTypes'
import { StyledTab } from './Tab'

const CustomTab = styled(StyledTab)`
  ${props => props.hasErrors && (
    css`
      color: ${props => props.theme.cube.colorRed};
      &:after {
        background-color: ${props => props.theme.cube.colorRed};
      }
    `
  )}
`

const FormTab = props => {
  const { label, fields, ...defaultProps } = props
  const { submitErrors } = useFormState()

  const submitErrorsKeys = keys(submitErrors)
  const hasErrors = pipe(
    filter(item => includes(item, submitErrorsKeys)),
    isEmpty,
    not
  )(fields)

  return (
    <CustomTab hasErrors={hasErrors} {...defaultProps}>
      {label}
    </CustomTab>
  )
}

FormTab.propTypes = {
  ...tabPropTypes,
  fields: PropTypes.array
}

export default FormTab
