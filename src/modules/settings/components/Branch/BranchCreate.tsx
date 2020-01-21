import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from '../../../../components/Menu'
import { Box } from '../../../../components/UI'

import { TGetDataFromState, TOnSubmit } from '../../../../types'
import { TOrderItem } from '../../../../types/models'
import { Merge } from '../../../../types/utils'
import BranchCreateForm from './BranchCreateForm'

type Props = {
    onSubmit: TOnSubmit;
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

export const fields = [
  'name'
]
const BranchCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Закази" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          mutators={{ ...arrayMutators }}
          component={BranchCreateForm}
        />
      </Box>
    </div>
  )
}

export default BranchCreate
