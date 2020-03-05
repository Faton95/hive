import {useHistory, useParams} from 'react-router-dom'
import { replaceParamsRoute } from '../utils/route'
import { getParamFromHistory } from '../utils/get'
import { TUseModalParams } from '../types'
import {TUseCustomModal} from "types/hooks";

const mapStrToBoolean = str => Boolean(str) && str !== 'false'

export default (params: TUseModalParams): TUseCustomModal => {
  const {
    key = 'modal',
    autoClose = false,
  } = params
  const history = useHistory()

  const open: boolean = mapStrToBoolean(getParamFromHistory(key, history))
  const onClose = () => {
    replaceParamsRoute({ [key]: false }, history)
  }

  const onOpen = (id) => {
    replaceParamsRoute({ [key]: id }, history)
  }


  return { onClose, onOpen, open }
}
