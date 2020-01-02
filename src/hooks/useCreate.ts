import { equals } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDataFromState } from '../utils/get'
import toSnakeCase from '../utils/toSnakeCase'
import { mapResponseToFormError } from '../utils/form'
import { useTypedSelector } from '../etc/reducers'
import { TGetDataFromState, TUseCreateParams } from '../types'

const useCreate = (params: TUseCreateParams) => {
  const {
    action,
    stateName,
    redirectUrl,
    onSuccess,
    serializer = toSnakeCase
  } = params

  const dispatch = useDispatch()
  const history = useHistory()

  const data = useTypedSelector<TGetDataFromState>(state => getDataFromState(stateName, state), equals)
  const onSubmit = (values: object) => {
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
