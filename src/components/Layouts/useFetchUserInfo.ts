import * as stateNames from 'constants/stateNames'
import { useEffect, useState } from 'react'
import equals from 'fast-deep-equal'
import { useTypedSelector, usePromiseDispatch } from 'etc/reducers'
import { getDataFromState } from 'utils/getTyped'
import { getCookie } from 'utils/cookie'
import {isNil, path} from 'ramda'
import { userInfoFetch } from 'modules/sign-in/action'
import {TGetDataFromState, TPositionItem} from "types";

type TLogin = {
  token: string
}

type TUserInfo = {
  user: {
    username: string;
    id: number;
  }
  isSuperuser: boolean;
  position: TPositionItem
}
const useFetchUserInfo = () => {
  const [isAuth, setIsAuth] = useState(true)
  const data = useTypedSelector<TGetDataFromState<TLogin>>(state => getDataFromState(stateNames.LOGIN, state), equals)
  const userInfo = useTypedSelector<TGetDataFromState<TUserInfo>>(state => getDataFromState(stateNames.USER_INFO, state), equals)
  const dispatch = usePromiseDispatch()
  const cookieToken = getCookie('token')

  const token = path(['data', 'token'], data)
  useEffect(() => {
    if ((!token && cookieToken) || isNil(userInfo.data)) {
      dispatch(userInfoFetch(cookieToken))
        .catch(eee => {
          setIsAuth(false)
          console.warn(eee)
        })
    }
    if (!token && !cookieToken) {
      setIsAuth(false)
      console.warn(token, cookieToken)
    }
  }, [])


  const loading = data.loading || userInfo.loading

  return {
    isAuth,
    loading
  }
}

export default useFetchUserInfo
