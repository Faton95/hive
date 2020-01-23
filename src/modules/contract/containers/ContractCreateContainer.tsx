import React from 'react'
import ContractCreate from '../components/ContractCreate'
import {
  contractCreateAction
} from '../actions/contractActions'

import {useFetchItem, useCreate, useFetchList} from 'hooks'
import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import Layout from 'components/Layouts/Layout'
import {groupListFetch} from "modules/settings/actions/groupActions";
import {TData, TGroupItem} from "types";


const ContractCreateContainer = props => {

  const data = useCreate({
    stateName: stateNames.CONTRACT_CREATE,
    action: contractCreateAction,
    redirectUrl: ROUTES.CONTRACT_LIST_PATH,
  })

  const groupData = useFetchList<TData<TGroupItem>>({
    stateName: stateNames.GROUP_LIST,
    action: groupListFetch
  })
  return (
    <Layout>
      <ContractCreate
        {...data}
        groupData={groupData}
      />
    </Layout>
  )
}
export default ContractCreateContainer
