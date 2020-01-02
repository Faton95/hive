import { equals } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDataFromState } from '../utils/get'
import toSnakeCase from '../utils/toSnakeCase'
import { mapResponseToFormError } from '../utils/form'

const useCreate = (params) => {
  const {
    action,
    stateName,
    redirectUrl,
    onSuccess,
    serializer = toSnakeCase
  } = params

  const dispatch = useDispatch()
  const history = useHistory()

  const data = useSelector(state => getDataFromState(stateName, state), equals)
  const onSubmit = values => {
    return dispatch(action(serializer(values)))
      .then(data => {
        if (onSuccess) {
          onSuccess(data, { values })
        } else if (redirectUrl) {
          history.push(redirectUrl)
        }
      })
      .catch(mapResponseToFormError)
  }

  return { onSubmit, ...data }
}

export default useCreate
