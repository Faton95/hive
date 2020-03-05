import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from '../../../../components/Menu'
import { Box } from '../../../../components/UI'

import { TGetDataFromState, TOnSubmit } from '../../../../types'
import { TStaffItem } from '../../../../types/models/position'
import { Merge } from '../../../../types/utils'
import StaffCreateForm from './StaffCreateForm'

type Props = {
    onSubmit: TOnSubmit;
    onPicUpdate;
}

type NewPropType = Merge<TGetDataFromState<TStaffItem | null>, Props>

export const fields = [
  'photo',
  'username',
  'fullName',
  'password',
  'position',
  'role'
]
const StaffCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Staff create" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          mutators={{ ...arrayMutators }}
          component={StaffCreateForm}
        />
      </Box>
    </div>
  )
}

export default StaffCreate
