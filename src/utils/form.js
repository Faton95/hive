import { omit, pick, join, isEmpty, pipe, prop, toPairs, flatten, map } from 'ramda'
import { FORM_ERROR } from 'final-form'
import { showToast } from 'components/Toast'

export const mapResponseToFormError = data => {
  const fieldErrors = omit(['nonFieldErrors'], data)
  const commonErrors = pick(['nonFieldErrors'], data)

  if (isEmpty(commonErrors)) {
    const a = pipe(
      toPairs,
      map(prop('1'))
    )(fieldErrors)

    showToast({
      type: 'error',
      title: ' ',
      message: a,
    })

    return fieldErrors
  }
  return {
    ...fieldErrors,
    [FORM_ERROR]: join(', ', commonErrors.nonFieldErrors)
  }
}

const toArray = err => {
  if (!err) {
    return []
  }

  if (Array.isArray(err)) {
    return err
  }

  return [err]
}
export const getFieldError = pipe(
  prop('submitError'),
  toArray,
  join(',')
)
