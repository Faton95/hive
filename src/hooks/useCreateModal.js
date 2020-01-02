import equal from 'fast-deep-equal'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDataFromState } from '../utils/get'
import { mapResponseToFormError } from '../utils/form'
import toSnakeCase from '../utils/toSnakeCase'
import useModal from './useModal'

export const onOpenModal = ({ value, params, history, onOpen }) => {
  onOpen()
  if (params.onOpen) {
    params.onOpen(params.key, value, history)
  }
}

export const onCloseModal = ({ onClose, params, history }) => {
  onClose()
  if (params.onClose) {
    params.onClose(params.key, history)
  }
}

export default params => {
  const {
    key = 'createModal',
    action,
    stateName,
    onSuccess,
    serializer = toSnakeCase
  } = params

  const { open, onOpen, onClose } = useModal({ key })

  if (!stateName) {
    throw Error('useCreateModal hook requires stateName!')
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(getDataFromState(stateName), equal)

  const onSubmit = values => {
    const serializeValues = serializer(values)
    return dispatch(action(serializeValues))
      .then(data => {
        if (onSuccess) onSuccess(data, values)
      })
      .then(() => onClose())
      .catch(mapResponseToFormError)
  }

  return {
    open,
    onOpen: value => onOpenModal({ value, params, onOpen, history }),
    onClose: () => onCloseModal({ params, onClose, history }),
    onSubmit,
    ...state
  }
}
