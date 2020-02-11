import React from 'react'
import Toast from '../Toast'
import ConfirmDialog from '../ConfirmDialog'
import useFetchUserInfo from './useFetchUserInfo'
const BaseLayout = props => {
    useFetchUserInfo()
    return (
        <>
            {props.children}
            <ConfirmDialog/>
            <Toast/>
        </>
    )
}

export default BaseLayout
