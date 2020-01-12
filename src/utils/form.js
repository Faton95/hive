import { omit, pick, join, isEmpty, pipe, prop } from 'ramda'
import { FORM_ERROR } from 'final-form'

export const mapResponseToFormError = data => {
  const fieldErrors = omit(['nonFieldErrors'], data)
  const commonErrors = pick(['nonFieldErrors'], data)

  if (isEmpty(commonErrors)) {
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
