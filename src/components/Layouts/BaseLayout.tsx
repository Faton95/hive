import * as ROUTES from 'constants/routes'
import React from 'react'
import { useHistory } from 'react-router-dom'
import MainBodySkeleton from 'components/Skeletons/MainBodySkeleton'
import { Container } from 'components/StyledElems'
import Toast from '../Toast'
import ConfirmDialog from '../ConfirmDialog'
import useFetchUserInfo from './useFetchUserInfo'

const BaseLayout = props => {
  const history = useHistory()
  const { loading, isAuth } = useFetchUserInfo()

  if (loading) {
    return <Container><MainBodySkeleton /></Container>
  }

  if (!isAuth) {
    history.replace(ROUTES.LOGIN_URL)
  }
  return (
    <>
      {props.children}
      <ConfirmDialog />
      <Toast />
    </>
  )
}

export default BaseLayout
