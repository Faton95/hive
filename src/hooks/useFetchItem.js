import { prop } from 'ramda'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import equal from 'fast-deep-equal'
import { getDataFromState } from '../utils/get'

const useFetchItem = params => {
  const { stateName, action, key = 'id' } = params
  const paramsRoute = useParams()
  const dispatch = useDispatch()
  const state = useSelector(getDataFromState(stateName), equal)
  const id = prop(key, paramsRoute)

  useEffect(
    () => { dispatch(action(id)) },
    [id, dispatch, action],
  )

  return state
}

export default useFetchItem
