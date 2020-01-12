
import { equals, path } from 'ramda'
import { useParams, useHistory } from 'react-router-dom'
import { usePromiseDispatch, useTypedSelector } from '../etc/reducers'
import { TGetDataFromState, TUseDeleteParams, TUseDelete } from '../types'
import {
  getDataFromState,
  getListParamsFromProps
} from '../utils/get'
import { showToast } from '../components/Toast'
import { closeConfirmDialogAction, openConfirmDialogAction } from '../components/ConfirmDialog/actions'

const useDelete = (params: TUseDeleteParams): TUseDelete => {
  const {
    action,
    stateName,
    successAction,
    onSuccess,
    idKey = 'id',
    redirectUrl,
    toastParams,
    modalParams
  } = params

  const history = useHistory()
  const queryParams = useParams()
  const dispatch = usePromiseDispatch()
  const data = useTypedSelector<TGetDataFromState<any>>(state => getDataFromState(stateName, state), equals)

  const onConfirm = id => {
      dispatch(openConfirmDialogAction({loading: true}))
    return dispatch(action(id))
      .then(() => dispatch(closeConfirmDialogAction()))
      .then(() =>
        showToast({
          title: 'Удалено',
          message: 'Данные удалены',
          ...toastParams
        })
      )
      .then(() => {
        const paramId = path([idKey], queryParams)
        const listParams = getListParamsFromProps({ history })
        if (onSuccess) onSuccess()
        else if (paramId) history.replace(redirectUrl)
        else dispatch(successAction(listParams))
      })
      .catch(() => Promise.resolve()
        .then(() => dispatch(closeConfirmDialogAction())
          .then(() => showToast({ type: 'error' }))
        ))
  }

  const onSubmit = id => {
    return dispatch(openConfirmDialogAction({
      onConfirm: () => onConfirm(id),
      ...modalParams
    }))
  }

  return { onSubmit, ...data }
}

export default useDelete
