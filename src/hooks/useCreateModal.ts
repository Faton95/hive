import equal from 'react-fast-compare'
import { useHistory } from 'react-router-dom'
import { getDataFromState } from 'utils/get'
import { mapResponseToFormError } from 'utils/form'
import { useTypedSelector, usePromiseDispatch } from 'etc/reducers'
import { TUseCreateModalParams, TUseCreateModal } from 'types/hooks'
import toSnakeCase from '../utils/toSnakeCase'
import useModal from './useModal'
import {TGetDataFromState} from "types";

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

const useCreateModal = <T extends any>(params: TUseCreateModalParams): TUseCreateModal<T> => {
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

  const dispatch = usePromiseDispatch()
  const state = useTypedSelector<TGetDataFromState<T>>(state => getDataFromState(state, stateName), equal)

  const onSubmit = (values: object) => {
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
    onOpen,
    onClose,
    onSubmit,
    ...state
  }
}

export default useCreateModal
