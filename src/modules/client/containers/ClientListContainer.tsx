import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useFilterActions,
  useDelete
} from '../../../hooks'
import { clientListFetch, clientDeleteAction } from '../action/actions'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import ClientList from '../components/ClientList'
import { fields } from '../components/ClientListFilterForm'
import { DEFAULT_PICK_PARAMS } from '../../../utils/isEquals'
import * as ROUTES from '../../../constants/routes'

const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'tags'
]
const ClientListContainer = props => {
  const data = useFetchList({
    action: clientListFetch,
    stateName: stateNames.CLIENT_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.CLIENT_DELETE,
    action: clientDeleteAction,
    successAction: clientListFetch
  })

  const filterAction = useFilterActions({ fields })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.CLIENT_UPDATE_URL, id))
  return (

    <ClientList
      data={data}
      filterAction={filterAction}
      onEdit={onEdit}
      deleteData={deleteData}
    />
  )
}

export default ClientListContainer
