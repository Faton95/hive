import * as stateNames from 'constants/stateNames'
import * as ROUTES from 'constants/routes'
import { useCreate, useFetchItem, useFetchList } from 'hooks'
import React from 'react'
import { clientItemFetch } from 'modules/client/action/actions'
import { assignmentListFetch } from 'modules/order/action/assignmentActions'
import { TAssignmentItem, TClientItem, TData } from 'types'
import { useParams, useHistory } from 'react-router-dom'
import toSnakeCase from 'utils/toSnakeCase'
import { sprintf } from 'sprintf-js'
import { preInvoiceCreateAction } from '../../action/preInvoice'
import UninvoicedCreate from '../../components/Uninvoiced/UninvoicedCreate'

const UninvoicedCreateContainer = props => {
  const history = useHistory()
  const { id } = useParams<{id: string}>()
  const clientData = useFetchItem<TClientItem>({
    action: clientItemFetch,
    stateName: stateNames.CLIENT_ITEM
  })

  const assignmentData = useFetchList<TData<TAssignmentItem>>({
    stateName: stateNames.ASSIGNMENT_LIST,
    action: assignmentListFetch,
    mapper: () => ({ client: id, page_size: 100 })
  })

  const data = useCreate({
    stateName: stateNames.UNINVOICED_CREATE,
    action: preInvoiceCreateAction,
    onSuccess: data => history.replace(sprintf(ROUTES.INVOICE_CREATE_URL, data.value.id)),
    serializer: values => toSnakeCase({ ...values, client: id })
  })
  return (
    <UninvoicedCreate
      clientData={clientData}
      assignmentData={assignmentData}
      createData={data}
      onSubmit={() => null}
    />
  )
}

export default UninvoicedCreateContainer
