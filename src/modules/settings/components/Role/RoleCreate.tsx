import React, { FunctionComponent } from 'react'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import { TGetDataFromState, TOnSubmit } from 'types'
import { TOrderItem, TGroupItem } from 'types/models'
import { Merge } from 'types/utils'
import RoleCreateForm from './RoleCreateForm'

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
      <DetailMenu title="Create Role" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          render={(formikProps) => (
            <RoleCreateForm {...formikProps} groups={props.groups}/>
            )}
        />
      </Box>
    </div>
  )
}

export default OrderCreate
