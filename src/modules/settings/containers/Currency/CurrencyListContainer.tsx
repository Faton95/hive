import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useDelete
} from '../../../../hooks'
import { currencyListFetch, currencyDeleteAction } from '../../actions/currency'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import CurrencyList from '../../components/Currency/CurrencyList'
import { DEFAULT_PICK_PARAMS } from '../../../../utils/isEquals'
import * as ROUTES from '../../../../constants/routes'

const PICK_PARAMS = [
  ...DEFAULT_PICK_PARAMS,
  'status',
  'client'
]
const CurrencyListContainer = props => {
  const data = useFetchList({
    action: currencyListFetch,
    stateName: stateNames.CURRENCY_LIST,
    pickParams: PICK_PARAMS
  })

  const deleteData = useDelete({
    stateName: stateNames.CURRENCY_DELETE,
    action: currencyDeleteAction,
    successAction: currencyListFetch
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.CURRENCY_UPDATE_URL, id))
  return (
    <Layout>
      <CurrencyList
        data={data}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default CurrencyListContainer
