import React from 'react'
import ClientCreate from '../components/ClientCreate'
import { clientCreateAction } from '../action/actions'
import { createSerializer } from '../action/clientSerializer'
import { useCreate } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import * as ROUTES from '../../../constants/routes'
import Layout from '../../../components/Layouts/Layout'

const ClientDetailContainer = props => {

  const data = useCreate({
    stateName: stateNames.CLIENT_CREATE,
    action: clientCreateAction,
    redirectUrl: ROUTES.CLIENT_LIST_PATH,
    serializer: createSerializer
  })
  return (
      <ClientCreate
        {...data}
      />
  )
}
export default ClientDetailContainer
