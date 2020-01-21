import React from 'react'
import CurrencyCreate from '../../components/Currency/CurrencyCreate'
import { currencyCreateAction } from '../../actions/currency'
import { createSerializer } from '../../serializers/currencySerializer'
import { useCreate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import * as ROUTES from '../../../../constants/routes'
import Layout from '../../../../components/Layouts/Layout'

const CurrencyDetailContainer = props => {
  const data = useCreate({
    stateName: stateNames.CURRENCY_CREATE,
    action: currencyCreateAction,
    redirectUrl: ROUTES.CURRENCY_LIST_PATH,
    serializer: createSerializer
  })
  return (
    <Layout>
      <CurrencyCreate {...data} />
    </Layout>
  )
}
export default CurrencyDetailContainer
