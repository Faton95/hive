import React from 'react'
import BankAccountCreate from '../../components/BankAccountComponent/BankAccountCreate'
import { bankAccountCreateAction } from '../../actions/bankAccountActions'
import { useCreate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import * as ROUTES from '../../../../constants/routes'
import Layout from '../../../../components/Layouts/Layout'
import { createSerializer } from '../../serializers/bankAccountSerializer'

const BankAccountCreateContainer = props => {
  const data = useCreate({
    stateName: stateNames.BANK_ACCOUNT_CREATE,
    action: bankAccountCreateAction,
    redirectUrl: ROUTES.BANK_ACCOUNT_LIST_PATH,
    serializer: createSerializer
  })
  return (
    <Layout>
      <BankAccountCreate {...data} />
    </Layout>
  )
}
export default BankAccountCreateContainer
