/* eslint react/prop-types: 0 */

import React from 'react'
import moment from 'moment'
import { includes } from 'ramda'
import styled, { css } from 'styled-components'

const CalendarDayCell = styled('td')`
  vertical-align: middle;
`

const CalendarDay = styled('div')`
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display:flex;
  justify-content:center;
  height: 30px;
  width: 30px;
  ${props => props.isBlocked && (
    css`
      opacity: 0.5;
      pointer-events: none;
    `
  )}
  ${props => props.isToday && (
    css`
      border: 2px solid ${props => props.theme.cube.primaryColor};
    `
  )}
  ${props => props.isSelected && (
    css`
      background-color: ${props => props.theme.cube.primaryColor} !important;
      color: white !important;
    `
  )}
  ${props => props.isSelectedStart && (
    css`
      background-color: ${props => props.theme.cube.primaryColor} !important;
      border-radius: 10px 4px 4px 10px !important;
      color: white !important;
    `
  )}
  ${props => props.isSelectedSpan && (
    css`
      background-color: #f5f6fd;
    `
  )}
  ${props => props.isSelectedEnd && (
    css`
      background-color: ${props => props.theme.cube.primaryColor} !important;
      border-radius: 4px 10px 10px 4px !important;
      color: white !important;
    `
  )}
`

const CalendarDayElem = ({ key, day, daySize, modifiers = {}, ...props }) => {
  const modifiersKeys = Array.from(modifiers)
  const prettyDay = moment(day).format('D')
  const isSelectedSingle = includes('selected', modifiersKeys)
  const isSelectedStart = includes('selected-start', modifiersKeys)
  const isSelectedSpan = includes('selected-span', modifiersKeys) ||
    includes('hovered-span', modifiersKeys)
  const isSelectedEnd = includes('selected-end', modifiersKeys)
  const isBlocked = includes('blocked-out-of-range', modifiersKeys)
  const isToday = includes('today', modifiersKeys)
  return (
    <CalendarDayCell
      key={key}
      style={{ height: daySize, width: daySize }}
      onClick={() => props.onDayClick(day)}
      onMouseEnter={() => props.onDayMouseEnter(day)}
      onMouseLeave={() => props.onDayMouseLeave(day)}
    >
      {day && (
        <CalendarDay
          isToday={isToday}
          isBlocked={isBlocked}
          isSelected={isSelectedSingle}
          isSelectedStart={isSelectedStart}
          isSelectedSpan={isSelectedSpan}
          isSelectedEnd={isSelectedEnd}
        >
          {prettyDay}
        </CalendarDay>
      )}
    </CalendarDayCell>
  )
}

export default CalendarDayElem
