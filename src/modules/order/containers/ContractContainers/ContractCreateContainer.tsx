import React from 'react'
import ContractCreate from '../../components/Contract/ContractCreate'
import {
  contractCreateAction
} from '../../action/contractActions'
import {
  createSerializer
} from '../../serializers/contractSerializer'
import {useCreate, useFetchList} from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import Layout from 'components/Layouts/Layout'
import {positionListFetch} from "modules/settings/actions/positionActions";
import {TData, TPositionItem} from "types";


const ContractCreateContainer = props => {

  const data = useCreate({
    stateName: stateNames.CONTRACT_CREATE,
    action: contractCreateAction,
    redirectUrl: ROUTES.CONTRACT_LIST_PATH,
    serializer: createSerializer
  })
  
  const positionData = useFetchList<TData<TPositionItem>>({
    stateName: stateNames.POSITION_LIST,
    action: positionListFetch
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
