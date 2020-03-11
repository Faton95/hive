import {prop, equals as equal, path} from 'ramda'
import { useHistory, useParams } from 'react-router-dom'

import { getDataFromState } from '../utils/get'
import toSnakeCase from '../utils/toSnakeCase'
import { mapResponseToFormError } from '../utils/form'

import { useTypedSelector, usePromiseDispatch } from '../etc/reducers'
import { TGetDataFromState, TUseUpdateParams, TUseUpdate } from '../types'

const useUpdate = <T extends any>(params: TUseUpdateParams): TUseUpdate => {
  const {
    stateName,
    action,
    redirectUrl,
    initialValues,
    key = 'id',
    onSuccess,
    serializer = toSnakeCase
  } = params

  const paramsRoute = useParams()
  const history = useHistory()
  const dispatch = usePromiseDispatch()
  const state = useTypedSelector<TGetDataFromState<T>>(state => getDataFromState(stateName, state), equal)
  const id: string = path([key], paramsRoute)

  const onSubmit = (values: object) => {
    const serializeValues = serializer(values)

    return dispatch(action(id, serializeValues))
      .then(data => {
        if (onSuccess) {
          onSuccess(data, { values })
        } else if (redirectUrl) {
          history.push(redirectUrl)
        }
      })
      .catch(mapResponseToFormError)
  }


  return { ...state, id, onSubmit, initialValues, isUpdate: true }
}

export default useUpdate
