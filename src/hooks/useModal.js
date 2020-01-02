import { useHistory } from 'react-router-dom'
import { replaceParamsRoute } from '../utils/route'
import { getBooleanFromHistory } from '../utils/get'

export default params => {
  const { key = 'modal', autoClose = false, } = params
  const history = useHistory()
  const open = getBooleanFromHistory(key, history)

  const onClose = () => {
    replaceParamsRoute({ [key]: false }, history)
  }

  const onOpen = () => {
    replaceParamsRoute({ [key]: true }, history)
  }

  const onSubmit = (event) => autoClose
    ? params.onSubmit(event).then(() => onClose())
    : params.onSubmit(event, onClose)

  return { onClose, onOpen, onSubmit, open }
}
