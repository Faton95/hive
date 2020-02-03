import React from 'react'
import { prop } from 'ramda'
import BankAccountUpdate from '../../components/BankAccountComponent/BankAccountUpdate'
import { bankAccountItemFetch, bankAccountUpdateAction } from '../../actions/bankAccountActions'
import { useFetchItem, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'
import {createSerializer} from '../../serializers/bankAccountSerializer'


const BankAccountUpdateContainer = () => {
  const bankAccountItem = useFetchItem({
    action: bankAccountItemFetch,
    stateName: stateNames.BANK_ACCOUNT_ITEM
  })

  const update = useUpdate({
    action: bankAccountUpdateAction,
    stateName: stateNames.BANK_ACCOUNT_UPDATE,
    redirectUrl: ROUTES.BANK_ACCOUNT_LIST_PATH,
    serializer: createSerializer
  })

  const data = prop('data', bankAccountItem)
  const initialValues = {
    ...data
  }

  return (
    <Layout>
      <BankAccountUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default BankAccountUpdateContainer
