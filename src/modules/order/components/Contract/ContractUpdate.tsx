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
import ContractCreateForm from './ContractCreateForm'

type Props = {
    onSubmit: TOnSubmit;
    initialValues: object;
    id: string;
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

const ContractUpdate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title={`Change Contract №${props.id}`} />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.initialValues}
          mutators={{ ...arrayMutators }}
          component={ContractCreateForm}
        />
      </Box>
    </div>
  )
}

export default ContractUpdate
