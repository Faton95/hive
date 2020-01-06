import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TextArea as TextAreaCUI } from 'ui-cubic'
import { getFieldError } from '~/utils/form'

const StyledTextArea = styled(TextAreaCUI)`
  line-height: 20px;
`

const TextArea = ({ meta, input, ...rest }) => (
  <StyledTextArea {...input} {...rest} error={getFieldError(meta)} />
)

TextArea.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string
}

export default TextArea
