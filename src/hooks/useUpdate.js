import { prop, equals as equal } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { getDataFromState } from '../utils/get'
import toSnakeCase from '../utils/toSnakeCase'
import { mapResponseToFormError } from '../utils/form'

const useUpdate = params => {
  const { stateName, action, redirectUrl, initialValues, key = 'id', props = {} } = params
  const paramsRoute = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(getDataFromState(stateName), equal)
  const onSuccess = params.onSuccess || (() => history.push(redirectUrl))
  const serializer = params.serializer || toSnakeCase

  const onSubmit = values => {
    const id = prop(key, paramsRoute)
    const serializeValues = serializer(values, params)

    return dispatch(action(id, serializeValues))
      .then(data => {
        onSuccess(data, { ...props, values })
      })
      .catch(mapResponseToFormError)
  }

  return { ...state, onSubmit, initialValues, isUpdate: true }
}

export default useUpdate
