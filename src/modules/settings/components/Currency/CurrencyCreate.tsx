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
import CurrencyCreateForm from './CurrencyCreateForm'

type Props = {
    onSubmit: TOnSubmit;
}

type NewPropType = Merge<TGetDataFromState<TCurrencyItem | null>, Props>

export const fields = [
  'name',
  'sign'
]
const CurrencyCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Currencies" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          mutators={{ ...arrayMutators }}
          component={CurrencyCreateForm}
        />
      </Box>
    </div>
  )
}

export default CurrencyCreate
