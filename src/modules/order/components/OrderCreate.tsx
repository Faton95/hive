import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { sprintf } from 'sprintf-js'
import { DetailMenu } from '../../../components/Menu'
import {
  Form,
  Field,
  InputField,
  UniversalSearchField
} from '../../../components/Form'
import { MENU_KEYS } from '../../../constants/menus'
import { TGetDataFromState, TData } from '../../../types'
import { TOrderItem } from '../../../types/models'
import numberFormat from '../../../utils/numberFormat'
import dateFormat from '../../../utils/dateFormat'
import { ORDER_ITEM_URL } from '../../../constants/routes'
import * as API from '../../../constants/api'

import {
  Table,
  TableActions,
  TableRow,
  TableRowLink,
  TableHeader,
  TableCol,
  TableBody
} from '../../../components/Table'
import { Box } from '../../../components/UI'

type Props = {
}

const OrderCreate: FunctionComponent<Props> = props => {

  return (
    <div>
      <DetailMenu title="Закази" />
      <Box>
        <Form
          onSubmit={() => null}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  label="dsds"
                  name="s"
                  component={UniversalSearchField}
                  api={API.ORDER_LIST}
                />
              </form>
            )
          }}
        />
      </Box>
    </div>
  )
}

export default OrderCreate
