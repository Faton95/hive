import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import ContractDetail from '../../components/Contract/ContractDetail'
import { contractItemFetch, contractDeleteAction, contractListFetch } from '../../action/contractActions'
import { useFetchItem, useDelete } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'

type Props = {
    history: History;
    location: Location;
}
const ContractDetailContainer = (props: Props) => {
  const data = useFetchItem({
    action: contractItemFetch,
    stateName: stateNames.CONTRACT_ITEM
  })
  const deleteData = useDelete({
    stateName: stateNames.CONTRACT_DELETE,
    action: contractDeleteAction,
    successAction: contractListFetch,
    redirectUrl: ROUTES.CONTRACT_LIST_PATH
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.CONTRACT_UPDATE_URL, id))

  return (
    <Layout>
      <ContractDetail
        item={data}
        deleteData={deleteData}
        onEdit={onEdit}
      />
    </Layout>
  )
}
export default ContractDetailContainer
