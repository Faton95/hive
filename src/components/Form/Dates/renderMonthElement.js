/* eslint react/prop-types: 0 */

import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const CalendarMonth = styled('div')`
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
`

const MonthElement = ({ month }) => {
  return (
    <CalendarMonth>
      {moment(month).format('MMMM YYYY')}
    </CalendarMonth>
  )
}

export default MonthElement
