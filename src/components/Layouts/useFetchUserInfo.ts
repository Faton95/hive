import * as stateNames from 'constants/stateNames'
import { useEffect } from 'react'
import equals from 'fast-deep-equal'
import { useTypedSelector, usePromiseDispatch } from 'etc/reducers'
import { getDataFromState } from 'utils/getTyped'
import { getCookie } from 'utils/cookie'
import { path } from 'ramda'
import { userInfoFetch } from 'modules/sign-in/action'

const useFetchUserInfo = () => {
  const data = useTypedSelector(state => getDataFromState(stateNames.LOGIN, state), equals)
  const dispatch = usePromiseDispatch()
  const cookieToken = getCookie('token')

  const token = path(['data', 'token'], data)
  useEffect(() => {
    console.warn('dasd')
    if (!token && cookieToken) {
      dispatch(userInfoFetch(cookieToken))
        .catch(eee => {
          console.warn(eee)
        })
    }
    if (!token && !cookieToken) {
      console.warn(token, cookieToken)
    }
  }, [])
}

export default useFetchUserInfo