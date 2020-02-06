import React from 'react'
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
import { getFieldError } from '~/utils/form'
import { Input } from '~/components/UI'
import numberFormat from '../../../utils/numberFormat'
import {get2D} from '../../../utils/get'

const Space = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
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

  console.warn(pureValue)

  pipe(
    splitEvery(2),
    join(':'),
    onChange
  )(pureValue)
})


const ONE_HOUR_IN_MINUTES = 60
const DurationInput = props => {
  const {
    input: { onChange, value, ...input },
    label,
    meta,
    height,
    salaryRate = 40
  } = props

  const [salary, setSalary] = React.useState('')
  const tested = test(/[0-9]{2}:[0-9]{2}/, value)
  const active = prop('active', meta)
  const touched = prop('touched', meta)
  const dirty = prop('dirty', meta)
  const isValid = !tested && !active && touched && dirty
  const error = isValid && 'Укажите время в правильном формате (03:20).'


  

  const onTimeEnter = ev => {

    if(ev.key === 'Enter'){
      ev.preventDefault()

      const v = ev.target.value
      const hourSpend = Number(v.substring(0,2))
      const hourToMinute = Number(hourSpend) * ONE_HOUR_IN_MINUTES
      const minuteSpend = Number(value.substring(3,5))
      const totalMinute = hourToMinute + minuteSpend
      const salaryPerMinute = salaryRate / 60
      const formSalary = numberFormat(Number(totalMinute) * salaryPerMinute)
      setSalary(formSalary)
    
    
    }
  }
  const onSalaryEnter = ev => {
//    ev.preventDefault()

    if(ev.key === 'Enter'){
      ev.preventDefault()
      const salary = parseFloat(ev.target.value)
      const salaryToHour = Math.floor(salary / salaryRate)
      const salaryToMinute = (salary % salaryRate) * (60 / salaryRate)
      const reverseValue = get2D(salaryToHour) + ':' + salaryToMinute
      console.warn(ev)
      onChange(reverseValue)
    }
  }
  return (
    <>
    <Input
      placeholder="Ex: 03:20"
      onChange={onType(onChange)}
      value={value}
      {...input}
      onKeyPress={onTimeEnter}

      label={label}
      error={error || getFieldError(meta)}
      height={height}
    />
    <Space>
      =
    </Space>
    <Input 
      placeholder="Ex: 2300"
      value={salary}
      onChange={(ev) => setSalary(ev.target.value)}
      {...input}
      onKeyPress={onSalaryEnter}
      label={label}
    />
    </>
  )
}

DurationInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  height: PropTypes.number,
}

export default DurationInput
