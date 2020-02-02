import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useFilterActions,
  useDelete
} from '../../../../hooks'
import { contractListFetch, contractDeleteAction } from '../../action/contractActions'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import ContractList from '../../components/Contract/ContractList'
import { fields } from '../../../order/components/Contract/ContractListFilterForm'
import { DEFAULT_PICK_PARAMS } from '../../../../utils/isEquals'
import * as ROUTES from '../../../../constants/routes'

const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'branch',
  'client',
  'range'
]
console.warn(PICK_PARAMS)
const ContractListContainer = props => {
  const data = useFetchList({
    action: contractListFetch,
    stateName: stateNames.CONTRACT_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.CONTRACT_DELETE,
    action: contractDeleteAction,
    successAction: contractListFetch
  })

  const filterAction = useFilterActions({ fields })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.CONTRACT_UPDATE_URL, id))
  return (
    <Layout>
      <ContractList
        data={data}
        filterAction={filterAction}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default ContractListContainer
