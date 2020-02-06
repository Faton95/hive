import { equals } from 'ramda'
import { useHistory } from 'react-router-dom'
import { TGetDataFromState, TUseCreateParams } from 'types'
import { TUseCreate } from 'types/hooks'
import { getDataFromState } from '../utils/get'
import toSnakeCase from '../utils/toSnakeCase'
import { mapResponseToFormError } from '../utils/form'
import { useTypedSelector, usePromiseDispatch } from '../etc/reducers'

const useCreate = (params: TUseCreateParams): TUseCreate => {
  const {
    action,
    stateName,
    redirectUrl,
    onSuccess,
    serializer = toSnakeCase
  } = params

  const dispatch = usePromiseDispatch()
  const history = useHistory()

  const data = useTypedSelector<TGetDataFromState<any>>(state => getDataFromState(stateName, state), equals)
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
