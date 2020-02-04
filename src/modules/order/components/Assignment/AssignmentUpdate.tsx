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
import AssignmentCreateForm from './AssignmentCreateForm'

type Props = {
    onSubmit: TOnSubmit;
    initialValues: object;
    id: string;
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

const AssignmentUpdate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title={`Change assignment №${props.id}`} />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.initialValues}
          mutators={{ ...arrayMutators }}
          component={AssignmentCreateForm}
        />
      </Box>
    </div>
  )
}

export default AssignmentUpdate
