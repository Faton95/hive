import React from 'react'
import Toast from '../Toast'
import ConfirmDialog from '../ConfirmDialog'

const BaseLayout = props => {

    return (
        <>
            {props.children}
            <ConfirmDialog/>
            <Toast/>
        </>
    )
}

export default BaseLayout
