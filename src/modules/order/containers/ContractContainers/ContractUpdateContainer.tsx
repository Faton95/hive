import React from 'react'
import { History, Location } from 'history'
import { sprintf } from 'sprintf-js'
import { useParams } from 'react-router-dom'
import { prop, propOr } from 'ramda'
import { TContractItem, TData, TPositionItem } from 'types'
import { TRateItem } from 'types/models/assignment'
import { positionListFetch } from 'modules/settings/actions/positionActions'
import { getPositionRate } from 'utils/get'
import ContractUpdate from '../../components/Contract/ContractUpdate'
import { contractItemFetch, contractUpdateAction } from '../../action/contractActions'
import { createSerializer } from '../../serializers/contractSerializer'
import { useFetchItem, useFetchList, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'

type Props = {
    history: History;
    location: Location;
}
const ContractUpdateContainer = (props: Props) => {
  const params: { id?: string } = useParams()
  const id = prop('id', params)

  const contractItem = useFetchItem<TContractItem>({
    action: contractItemFetch,
    stateName: stateNames.CONTRACT_ITEM
  })

  const update = useUpdate({
    action: contractUpdateAction,
    stateName: stateNames.CONTRACT_UPDATE,
    redirectUrl: sprintf(ROUTES.CONTRACT_ITEM_URL, id),
    serializer: createSerializer
  })

  const positionData = useFetchList<TData<TPositionItem>>({
    stateName: stateNames.POSITION_LIST,
    action: positionListFetch,
    mapper: () => ({ page_size: 100 })
  })

  const data = prop('data', contractItem)

  const rateList = propOr<Array<TRateItem>, TContractItem, TRateItem[]>([], 'rates', data)

  const rates = getPositionRate(rateList)
  const initialValues = {
    ...data,
    rates
  }

  return (
    <Layout>
      <ContractUpdate
        {...update}
        initialValues={initialValues}
        positionData={positionData}
      />
    </Layout>
  )
}

export default ContractUpdateContainer
