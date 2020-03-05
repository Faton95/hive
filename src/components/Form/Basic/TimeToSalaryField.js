import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  splitEvery,
  pipe,
  pathOr,
  join,
  replace,
  length,
  lt,
  curry,
  prop,
  test,
} from 'ramda'
import { RateContext } from 'etc/context'
import { get2D } from '../../../utils/get'
import { getFieldError } from '~/utils/form'
import { Input } from '~/components/UI'

const Field = styled.div`
  display: flex;
  justify-content: space-between;
`
const Equal = styled.div`
  margin: 35px 30px 0 30px;
`
const getPure = pipe(
  pathOr('', ['target', 'value']),
  replace(/:/g, '')
)
const notNumber = pipe(
  Number,
  isNaN
)
const overflow = pipe(
  length,
  lt(4)
)

const onType = curry((onChange, ev) => {
  const pureValue = getPure(ev)
  if (notNumber(pureValue) || overflow(pureValue)) return

  pipe(
    splitEvery(2),
    join(':'),
    onChange
  )(pureValue)
})

const ONE_HOUR_IN_MINUTES = 60
const calcSalary = (ev, rate) => {
  const v = ev.target.value
  const hourSpend = Number(v.substring(0, 2))
  const hourToMinute = Number(hourSpend) * ONE_HOUR_IN_MINUTES
  const minuteSpend = Number(v.substring(3, 5))
  const totalMinute = hourToMinute + minuteSpend
  const salaryPerMinute = rate / 60
  return Number(totalMinute) * salaryPerMinute
}

const calcTime = (ev, salaryRate) => {
  const salary = parseFloat(ev.target.value)
  const salaryToHour = Math.floor(salary / salaryRate)
  const salaryToMinute = (salary % salaryRate) * (60 / salaryRate)
  return get2D(salaryToHour) + ':' + get2D(salaryToMinute)
}

const TimeToSalaryField = props => {
  const {
    input: { onChange, value, ...input },
    meta,
    height,
  } = props

  const salaryRate = useContext(RateContext)

  const [salary, setSalary] = React.useState('')
  const tested = test(/[0-9]{2}:[0-9]{2}/, value)
  const active = prop('active', meta)
  const touched = prop('touched', meta)
  const dirty = prop('dirty', meta)
  const isValid = !tested && !active && touched && dirty
  const error = isValid && 'Укажите время в правильном формате (03:20).'

  const onTimeEnter = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      const formSalary = calcSalary(ev, salaryRate)
      return setSalary(formSalary)
    }
  }

  const onBlur = ev => {
    const formSalary = calcSalary(ev, salaryRate)
    return setSalary(formSalary)
  }
  const onSalaryEnter = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      const time = calcTime(ev, salaryRate)
      onChange(time)
    }
  }
  const onSalaryBlur = ev => {
    const time = calcTime(ev, salaryRate)
    onChange(time)
  }

  return (
    <Field>
      <Input
        placeholder="Ex: 03:20"
        onChange={onType(onChange)}
        value={value}
        {...input}
        onKeyPress={onTimeEnter}
        onBlur={onBlur}
        label="Time"
        error={error || getFieldError(meta)}
        height={height}
      />
      <Equal>
      =
      </Equal>
      <Input
        placeholder="Ex: 2300"
        value={salary}
        onChange={(ev) => setSalary(ev.target.value)}
        {...input}
        onKeyPress={onSalaryEnter}
        onBlur={onSalaryBlur}
        label="Salary"
      />
    </Field>
  )
}

TimeToSalaryField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  height: PropTypes.number,
}

export default TimeToSalaryField
