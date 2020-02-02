import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import { prop } from 'ramda'
import ContractUpdate from '../../components/Contract/ContractUpdate'
import { contractItemFetch, contractUpdateAction } from '../../action/contractActions'
import { createSerializer } from '../../serializers/contractSerializer'
import { useFetchItem, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'
import { getIdForInitValues } from '../../../../utils/get'

type Props = {
    history: History;
    location: Location;
}
const ContractUpdateContainer = (props: Props) => {
  const params: {id?: string} = useParams()
  const id = prop('id', params)

  const contractItem = useFetchItem({
    action: contractItemFetch,
    stateName: stateNames.CONTRACT_ITEM
  })

  const update = useUpdate({
    action: contractUpdateAction,
    stateName: stateNames.CONTRACT_UPDATE,
    redirectUrl: sprintf(ROUTES.CONTRACT_ITEM_URL, id),
    serializer: createSerializer
  })

  const data = prop('data', contractItem)
  const initialValues = {
    ...data,
    ...getIdForInitValues(data, ['paymentType'])
  }

  return (
    <Layout>
      <ContractUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default ContractUpdateContainer
