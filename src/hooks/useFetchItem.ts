import { prop } from 'ramda'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import equal from 'fast-deep-equal'
import { getDataFromState } from '../utils/get'
import { TGetDataFromState, TUseFetchItemParams } from '../types'
import { useTypedSelector } from '../etc/reducers'

const useFetchItem = (params: TUseFetchItemParams) => {
  const { stateName, action, key = 'id' } = params
  const paramsRoute: object = useParams()

  const dispatch = useDispatch()
  const state = useTypedSelector<TGetDataFromState>(state => getDataFromState(stateName, state), equal)
  const id = prop(key, paramsRoute)

  useEffect(
    () => { dispatch(action(id)) },
    [id, dispatch, action],
  )

  return state
}

export default useFetchItem
