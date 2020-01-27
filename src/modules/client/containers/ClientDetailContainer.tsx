import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import ClientDetail from '../components/ClientDetail'
import { clientItemFetch } from '../action/actions'
import { useFetchItem } from '../../../hooks'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import * as ROUTES from '../../../constants/routes'

type Props = {
    history: History;
    location: Location;
}
const ClientDetailContainer = (props: Props) => {
  const data = useFetchItem({
    action: clientItemFetch,
    stateName: stateNames.CLIENT_ITEM
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.CLIENT_UPDATE_URL, id))

  return (
    <Layout>
      <ClientDetail
        item={data}
        onDelete={() => null}
        onEdit={onEdit}
      />
    </Layout>
  )
}
export default ClientDetailContainer
