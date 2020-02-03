import React, { FunctionComponent } from 'react'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import { TGetDataFromState, TOnSubmit } from 'types'
import { TOrderItem, TGroupItem } from 'types/models'
import { Merge } from 'types/utils'
import PositionCreateForm from './PositionCreateForm'

type Props = {
  onSubmit: TOnSubmit;
  groups: TGetDataFromState<TGroupItem>
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

export const fields = [
  'groups',
  'name'
]
const OrderCreate: FunctionComponent<NewPropType> = props => {

  return (
    <div>
      <DetailMenu title="Добавить Должность" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          render={(formikProps) => (
            <PositionCreateForm {...formikProps}  groups={props.groups}/>
            )}
        />
      </Box>
    </div>
  )
}

export default OrderCreate
