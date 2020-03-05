import * as STATE from 'constants/stateNames'
import { useTypedSelector } from 'etc/reducers'
import { getDataFromState } from 'utils/getTyped'
import { path } from 'ramda'
import {TPositionItem} from "types";

const useUserPosition = () => {
  const user = useTypedSelector(state => getDataFromState(STATE.USER_INFO, state))
  return path<TPositionItem>(['data', 'position'], user)
}

export default useUserPosition
