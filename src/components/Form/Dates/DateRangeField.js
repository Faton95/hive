import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { path } from 'ramda'
import styled, { css } from 'styled-components'
import { DateRangePicker } from 'react-dates'
import commonProps from './commonProps'
import { customArrowIcon } from './customIcons'
import { getFieldError } from 'utils/form'
import { InputLabel, InputError } from 'components/UI'

const DateContainer = styled('div')`
  align-items: center;
  background-color: ${props => props.theme.input.backgroundColor};
  border: 1px solid transparent;
  border-radius: ${props => props.theme.input.borderRadius};
  display:flex;
  height: 52px;
  transition: ${props => props.theme.cube.transition};
  ${props => props.isFocused && (
    css`
      background-color: white !important;
      border-color: ${props => props.theme.cube.primaryColor};
    `
  )}
  &:hover {
    background-color: ${props => props.theme.input.backgroundColorHover};
  }

  & .DateRangePicker {
    width: 100%;
  }
  & .DateRangePickerInput {
    background-color: transparent;
  }
  & .DateRangePickerInput_calendarIcon {
    outline: none;
    margin: 0 5px;
  }
  & .DateRangePickerInput_clearDates {
  
  }
  & .DateInput {
    background-color: transparent;
    min-width: 100px;
  }
  & .DateInput_input {
    background-color: transparent;
    border-bottom: none;
    color: ${props => props.theme.cube.textColor};
    font-size: 15px;
    text-align: center;
    &::placeholder {
      color: ${props => props.theme.input.placeholderColor};
    }
  }
`

class DateRangeField extends React.Component {
  constructor (props) {
    super(props)

    this.dateRangeProps = {
      ...commonProps,
      isOutsideRange: () => false,
      startDatePlaceholderText: 'Начало',
      endDatePlaceholderText: 'Конец',
      customArrowIcon,
      showClearDates: true
    }
    this.state = { focusedInput: null }
    this.onChange = this.onChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
  }

  getFormattedDate = date => {
    const regEx = /\d{4}-{1}\d{2}-{1}\d{2}/

    if (regEx.test(date)) {
      return moment(date)
    }

    return null
  }

  getValidDateFormat = momentDate => {
    const format = 'YYYY-MM-DD'
    if (moment(momentDate).isValid()) {
      return moment(momentDate).format(format)
    }
    return null
  }

  onChange ({ startDate, endDate }) {
    const { input } = this.props
    const validStartDate = this.getValidDateFormat(startDate)
    const validEndDate = this.getValidDateFormat(endDate)
    input.onChange({
      startDate: validStartDate,
      endDate: validEndDate
    })
  }

  onFocusChange (focused) {
    this.setState({
      focusedInput: focused
    })
  }

  render () {
    const { input, meta, label, ...defaultProps } = this.props
    const { focusedInput } = this.state

    const inputName = path(['name'], input)

    const startDate = path(['value', 'startDate'], input)
    const endDate = path(['value', 'endDate'], input)

    const isFocused = typeof focusedInput === 'string'
    const errorText = getFieldError(meta)

    return (
      <div>
        <InputLabel>{label}</InputLabel>
        <DateContainer
          isFocused={isFocused}
          onClick={event => {
            if (event.currentTarget === event.target) {
              this.onFocusChange('startDate')
            }
          }}>
          <DateRangePicker
            {...this.dateRangeProps}
            {...defaultProps}
            focusedInput={focusedInput}
            startDate={this.getFormattedDate(startDate)}
            endDate={this.getFormattedDate(endDate)}
            startDateId={inputName + '_start'}
            endDateId={inputName + '_end'}
            onFocusChange={this.onFocusChange}
            onDatesChange={this.onChange}
          />
        </DateContainer>
        <InputError>{errorText}</InputError>
      </div>
    )
  }
}

DateRangeField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default DateRangeField
