import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import ClientDetail from '../components/ClientDetail'
import { clientDeleteAction, clientItemFetch, clientListFetch } from '../action/actions'
import { useDelete, useFetchItem } from '../../../hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'

type Props = {
    history: History;
    location: Location;
}
const ClientDetailContainer = (props: Props) => {
  const data = useFetchItem({
    action: clientItemFetch,
    stateName: stateNames.CLIENT_ITEM
  })

  const deleteData = useDelete({
    stateName: stateNames.CLIENT_DELETE,
    action: clientDeleteAction,
    redirectUrl: ROUTES.CLIENT_LIST_PATH
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.CLIENT_UPDATE_URL, id))

  return (
    <ClientDetail
      item={data}
      onDelete={deleteData.onSubmit}
      onEdit={onEdit}
    />
  )
}
export default ClientDetailContainer
