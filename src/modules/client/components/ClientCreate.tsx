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
import ClientCreateForm from './ClientCreateForm'

type Props = {
    onSubmit: TOnSubmit;
}

type NewPropType = Merge<TGetDataFromState<TClientItem | null>, Props>

export const fields = [
  'name',
  'address',
  'email',
  'password',
  'tags',
  'contacts'
]
const ClientCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Clients" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          mutators={{ ...arrayMutators }}
          component={ClientCreateForm}
        />
      </Box>
    </div>
  )
}

export default ClientCreate
