import { prop, equals as equal } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { getDataFromState } from '../utils/get'
import toSnakeCase from '../utils/toSnakeCase'
import { mapResponseToFormError } from '../utils/form'

import { useTypedSelector } from '../etc/reducers'
import { TGetDataFromState, TUseUpdateParams } from '../types'

const useUpdate = (params: TUseUpdateParams) => {
  const {
    stateName,
    action,
    redirectUrl,
    initialValues,
    key = 'id',
    props = {},
    onSuccess,
    serializer = toSnakeCase
  } = params

  const paramsRoute = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useTypedSelector<TGetDataFromState>(state => getDataFromState(stateName, state), equal)

  const onSubmit = (values: object) => {
    const id = prop(key, paramsRoute)
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

  return { ...state, onSubmit, initialValues, isUpdate: true }
}

export default useUpdate
