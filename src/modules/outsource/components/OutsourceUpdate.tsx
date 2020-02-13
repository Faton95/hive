import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from '../../../components/Menu'
import { Box } from '../../../components/UI'

import { TGetDataFromState, TOnSubmit } from '../../../types'
import { TClientItem } from '../../../types/models'
import { Merge } from '../../../types/utils'
import OutsourceCreateForm from './OutsourceCreateForm'

type Props = {
    onSubmit: TOnSubmit;
    initialValues: object;
    id: string;
}

type NewPropType = Merge<TGetDataFromState<TClientItem | null>, Props>

const OutsourceUpdate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title={`Change client №${props.id}`} />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.initialValues}
          mutators={{ ...arrayMutators }}
          component={OutsourceCreateForm}
        />
      </Box>
    </div>
  )
}

export default OutsourceUpdate
