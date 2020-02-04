import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useDelete
} from '../../../../hooks'
import { bankAccountListFetch, bankAccountDeleteAction } from '../../actions/bankAccountActions'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import BankAccountList from '../../components/BankAccountComponent/BankAccountList'
import * as ROUTES from '../../../../constants/routes'

const BankAccountListContainer = props => {
  const data = useFetchList({
    action: bankAccountListFetch,
    stateName: stateNames.BANK_ACCOUNT_LIST,
  })

  const deleteData = useDelete({
    stateName: stateNames.BANK_ACCOUNT_DELETE,
    action: bankAccountDeleteAction,
    successAction: bankAccountListFetch
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.BANK_ACCOUNT_UPDATE_URL, id))
  return (
    <Layout>
      <BankAccountList
        data={data}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default BankAccountListContainer
