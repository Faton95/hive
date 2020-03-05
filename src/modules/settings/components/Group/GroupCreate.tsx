import React, { FunctionComponent } from 'react'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import {
  TGetDataFromState,
  TOnSubmit,
  Merge,
  TIdName,
  TGroupItem,
  TData
} from 'types'
import GroupCreateForm from './GroupCreateForm'

type Props = {
  onSubmit: TOnSubmit;
  permissionData: TGetDataFromState<TData<TIdName>>
}

type NewPropType = Merge<TGetDataFromState<TGroupItem | null>, Props>

export const fields = [
  'name'
]
const BranchCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Group create" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          render={formikProps => (
            <GroupCreateForm
              permissionData={props.permissionData}
              {...formikProps}
            />
          )}
        />
      </Box>
    </div>
  )
}

export default BranchCreate
