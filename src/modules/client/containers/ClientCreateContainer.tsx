import React from 'react'
import ClientCreate from '../components/ClientCreate'
import { clientItemFetch , clientCreateAction } from '../action/actions'
import { createSerializer } from '../action/clientSerializer'
import { useFetchItem, useCreate } from '../../../hooks'
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
    <Layout>
      <ClientCreate
        {...data}
      />
    </Layout>
  )
}
export default ClientDetailContainer
