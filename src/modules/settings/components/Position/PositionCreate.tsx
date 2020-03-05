import React, { FunctionComponent } from 'react'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import { TGetDataFromState, TOnSubmit } from 'types'
import { TOrderItem } from 'types/models'
import { Merge } from 'types/utils'
import PositionCreateForm from './PositionCreateForm'

type Props = {
  onSubmit: TOnSubmit;
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

export const fields = [
  'groups',
  'name'
]
const OrderCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Create Position" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          render={(formikProps) => (
            <PositionCreateForm {...formikProps} />
          )}
        />
      </Box>
    </div>
  )
}

export default OrderCreate
