import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import { useCreate, useFetchList } from 'hooks'
import React from 'react'
import Layout from 'components/Layouts/Layout'
import { positionListFetch } from 'modules/settings/actions/positionActions'
import { TData, TPositionItem } from 'types'
import {
  createSerializer
} from '../../serializers/contractSerializer'
import {
  contractCreateAction
} from '../../action/contractActions'
import ContractCreate from '../../components/Contract/ContractCreate'

const ContractCreateContainer = props => {
  const data = useCreate({
    stateName: stateNames.CONTRACT_CREATE,
    action: contractCreateAction,
    redirectUrl: ROUTES.CONTRACT_LIST_PATH,
    serializer: createSerializer
  })

  const positionData = useFetchList<TData<TPositionItem>>({
    stateName: stateNames.POSITION_LIST,
    action: positionListFetch,
    mapper: () => ({ page_size: 100 })
  })
  return (
    <Layout>
      <ContractCreate
        {...data}
        positionData={positionData}
      />
    </Layout>
  )
}
export default ContractCreateContainer
