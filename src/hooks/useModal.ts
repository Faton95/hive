import { useHistory } from 'react-router-dom'
import { replaceParamsRoute } from '../utils/route'
import { getBooleanFromHistory } from '../utils/get'
import { TUseModalParams } from '../types'

export default (params: TUseModalParams) => {
  const {
    key = 'modal',
    autoClose = false,
  } = params
  const history = useHistory()

  const open: boolean = getBooleanFromHistory(key, history)

  const onClose = () => {
    replaceParamsRoute({ [key]: false }, history)
  }

  const onOpen = () => {
    replaceParamsRoute({ [key]: true }, history)
  }

  const onSubmit = (event) => params.onSubmit && (autoClose
    ? params.onSubmit(event).then(() => onClose())
    : params.onSubmit(event, onClose)
  )

  return { onClose, onOpen, onSubmit, open }
}
