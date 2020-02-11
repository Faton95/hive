import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from '../../../../components/Menu'
import { Box } from '../../../../components/UI'

import { TGetDataFromState, TOnSubmit } from '../../../../types'
import { TCurrencyItem } from '../../../../types/models'
import { Merge } from '../../../../types/utils'
import StaffCreateForm from './StaffCreateForm'

type Props = {
    onSubmit: TOnSubmit;
}

type NewPropType = Merge<TGetDataFromState<TCurrencyItem | null>, Props>

export const fields = [
  'username',
  'password',
    'position',
    'rate'
]
const StaffCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Currencies" />
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
