import { prop } from 'ramda'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import equal from 'fast-deep-equal'
import { getDataFromState } from '../utils/getTyped'
import { TGetDataFromState, TUseFetchItemParams } from '../types'
import { useTypedSelector, usePromiseDispatch } from '../etc/reducers'

const useFetchItem = <T extends any>(params: TUseFetchItemParams) => {
  const { stateName, action, key = 'id' } = params
  const paramsRoute: object = useParams()

  const dispatch = usePromiseDispatch()
  const state = useTypedSelector<TGetDataFromState<T>>(state => getDataFromState(stateName, state), equal)
  const id = prop(key, paramsRoute)

  useEffect(
    () => { dispatch(action(id)) },
    [id, dispatch, action],
  )

  return state
}

export default useFetchItem
