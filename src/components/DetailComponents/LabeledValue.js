import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InputLabel } from '~/components/UI'

const Content = styled('div')`
  line-height: normal;
  min-width: 220px;
`

const Label = styled(InputLabel)`
  font-size: 12px;
  margin-bottom: ${props => props.margin}px;
`

const Value = styled('span')`
  display:block;
`

const LabeledValue = props => {
  const { label, children, labelMargin, ...rest } = props
  return (
    <Content {...rest}>
      <Label margin={labelMargin}>{label}</Label>
      <Value>{children}</Value>
    </Content>
  )
}

LabeledValue.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  labelMargin: PropTypes.number,
}

LabeledValue.defaultProps = {
  labelMargin: 14
}

export default LabeledValue
