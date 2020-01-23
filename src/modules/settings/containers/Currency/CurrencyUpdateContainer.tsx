import React from 'react'
import { prop } from 'ramda'
import CurrencyUpdate from '../../components/Currency/CurrencyUpdate'
import { currencyItemFetch, currencyUpdateAction } from '../../actions/currency'
import { useFetchItem, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'
import { getIdForInitValues } from '../../../../utils/get'

const CurrencyUpdateContainer = () => {
  const currencyItem = useFetchItem({
    action: currencyItemFetch,
    stateName: stateNames.CURRENCY_ITEM
  })

  const update = useUpdate({
    action: currencyUpdateAction,
    stateName: stateNames.CURRENCY_UPDATE,
    redirectUrl: ROUTES.CURRENCY_LIST_PATH,
  })

  const data = prop('data', currencyItem)
  const initialValues = {
    ...data
  }

  return (
    <Layout>
      <CurrencyUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default CurrencyUpdateContainer
