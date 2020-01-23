import { pick, pipe, equals } from 'ramda'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getParamsFormHistory } from '../utils/get'
import { getDataFromState } from '../utils/getTyped'
import { DEFAULT_PICK_PARAMS } from '../utils/isEquals'
import toSnakeCase from '../utils/toSnakeCase'
import {
  TUseFetchListParams,
  TGetDataFromState,
  THistory
} from '../types'
import { usePromiseDispatch, useTypedSelector } from '../etc/reducers'
import useCompareEffect from './useCompareEffect'

export const getListParams = (history: THistory, keys: Array<string>) =>
  pipe(
    getParamsFormHistory,
    pick(keys),
    toSnakeCase
  )(history)

const useFetchList = <D = any>(params: TUseFetchListParams) => {
  const {
    stateName,
    action,
    mapper = getListParams,
    pickParams = DEFAULT_PICK_PARAMS
  } = params

  const dispatch = usePromiseDispatch()
  const history = useHistory()

  const searchParams = getListParams(history, pickParams)

  const data = useTypedSelector<TGetDataFromState<D>>(state => getDataFromState(stateName, state), equals)
  useCompareEffect(() => { dispatch(action(mapper(history, pickParams))) }, [searchParams])

  return data
}

export default useFetchList
