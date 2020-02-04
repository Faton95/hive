import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from '../../../../components/Menu'
import { Box } from '../../../../components/UI'

import { TGetDataFromState, TOnSubmit } from '../../../../types'
import { TBankAddressItem } from '../../../../types/models'
import { Merge } from '../../../../types/utils'
import BankAccountCreateForm from './BankAccountCreateForm'

type Props = {
    onSubmit: TOnSubmit;
}

type NewPropType = Merge<TGetDataFromState<TBankAddressItem | null>, Props>

export const fields = [
  'name',
  'code',
  'branch',
  'currency',
  'address',
  'bankDetails'
]
const BankAccountCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Currencies" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          mutators={{ ...arrayMutators }}
          component={BankAccountCreateForm}
        />
      </Box>
    </div>
  )
}

export default BankAccountCreate
