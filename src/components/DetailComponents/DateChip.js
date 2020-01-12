import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Calendar } from 'react-feather'
import { isExpired } from 'utils/date'
import dateFormat from '~/utils/dateFormat'

const Prefix = styled('span')`
  color: ${props => props.theme.input.labelColor};
`

const ChipContainer = styled('div')`
  align-items: center;
  display: inline-flex;
  height: 25px;
  & > svg {
    color: ${props => props.theme.cube.primaryColor};
    margin-right: 5px;
    min-width: 15px;
  }
  ${props => props.withBackground && (
    css`
      background-color: #f7f8fa;
      border-radius: 50px;
      padding: 0 10px;
      & > svg {
        color: ${props => props.theme.input.labelColor};
      }
    `
  )}
  ${props => props.isExpired && (
    css`
      color: ${props => props.theme.cube.colorRed};
      & > svg, & ${Prefix} {
        color: inherit !important;
      }
    `
  )}
`

const DateChip = props => {
  const {
    date,
    prefix,
    withTime,
    isDeadline,
    prefixStyles,
    ...rest
  } = props

  const isExpiredDate = isDeadline && isExpired(date)
  const fullDate = dateFormat(date, withTime)
  const dateContent = prefix
    ? (
      <div>
        <Prefix style={prefixStyles}>{prefix} -</Prefix> {fullDate}
      </div>
    )
    : fullDate

  return (
    <ChipContainer isExpired={isExpiredDate} {...rest}>
      <Calendar size={15} />
      {dateContent}
    </ChipContainer>
  )
}

DateChip.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  prefix: PropTypes.string,
  prefixStyles: PropTypes.object,
  isDeadline: PropTypes.bool,
  withBackground: PropTypes.bool,
  withTime: PropTypes.bool,
}

DateChip.defaultProps = {
  isDeadline: false,
  withBackground: true,
  withTime: false,
}

export default DateChip
