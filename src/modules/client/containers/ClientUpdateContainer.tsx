import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import { prop} from 'ramda'
import CLientUpdate from '../components/ClientUpdate'
import { clientItemFetch, clientUpdateAction } from '../action/actions'
import { createSerializer } from '../action/clientSerializer'
import { useFetchItem, useUpdate } from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'

type Props = {
  history: History;
  location: Location;
};
const ClientUpdateContainer = (props: Props) => {
  const params: { id?: string } = useParams()
  const id = prop('id', params)

  const clientItem = useFetchItem({
    action: clientItemFetch,
    stateName: stateNames.CLIENT_ITEM
  })

  const update = useUpdate({
    action: clientUpdateAction,
    stateName: stateNames.CLIENT_UPDATE,
    redirectUrl: sprintf(ROUTES.CLIENT_ITEM_URL, id),
    serializer: createSerializer
  })

  const data = prop('data', clientItem)

  const initialValues = {
    ...data
  }

  return <CLientUpdate {...update} initialValues={initialValues} />
}

export default ClientUpdateContainer
