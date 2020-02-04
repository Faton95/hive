import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import { DetailMenu } from 'components/Menu/index'
import { Box } from 'components/UI'

import {
  TGetDataFromState,
  TOnSubmit,
  Merge,
  TData,
  TPositionItem
} from 'types'

import ContractCreateForm from './ContractCreateForm'

type Props = {
  onSubmit: TOnSubmit,
  positionData: TGetDataFromState<TData<TPositionItem>>
}

type NewPropType = Merge<TGetDataFromState<null>, Props>

export const fields = [
  'client',
  'branch',
  'bankAccount',
  'currency',
]
const ContractCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Contract Create" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          render={formikProps => (
            <ContractCreateForm
              {...formikProps}
              positionData={props.positionData}

            />
          )}
        />
      </Box>
    </div>
  )
}

export default ContractCreate
