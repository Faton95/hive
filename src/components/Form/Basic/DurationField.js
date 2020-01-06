import React from 'react'
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
  lt(6)
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

const DurationInput = props => {
  const {
    input: { onChange, value, ...input },
    label,
    meta,
    height
  } = props

  const tested = test(/[0-9]{2}:[0-9]{2}:[0-9]{2}/, value)
  const active = prop('active', meta)
  const touched = prop('touched', meta)
  const dirty = prop('dirty', meta)
  const isValid = !tested && !active && touched && dirty
  const error = isValid && 'Укажите время в правильном формате (03:20:00).'

  return (
    <Input
      placeholder={'03:20:00'}
      onChange={onType(onChange)}
      value={value}
      {...input}
      label={label}
      error={error || getFieldError(meta)}
      height={height}
    />
  )
}

DurationInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  height: PropTypes.number,
}

export default DurationInput
