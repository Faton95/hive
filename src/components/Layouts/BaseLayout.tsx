import React from 'react'
import {useHistory} from 'react-router-dom'
import Toast from '../Toast'
import ConfirmDialog from '../ConfirmDialog'
import useFetchUserInfo from './useFetchUserInfo'
import * as ROUTES from 'constants/routes'
import MainBodySkeleton from 'components/Skeletons/MainBodySkeleton'
const BaseLayout = props => {
    const history = useHistory()
    const {loading, isAuth} = useFetchUserInfo()

    if(loading) {
      return <MainBodySkeleton/>
    }

    if(!isAuth) {
      history.replace(ROUTES.LOGIN_URL)
    }
    return (
        <>
            {props.children}
            <ConfirmDialog/>
            <Toast/>
        </>
    )
}

export default BaseLayout
