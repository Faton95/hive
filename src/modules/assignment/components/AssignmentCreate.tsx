import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import { TGetDataFromState, TOnSubmit, Merge, TGroupItem, TData, TPositionItem } from 'types'

import ContractCreateForm from './AssignmentCreateForm'

type Props = {
  onSubmit: TOnSubmit,
  positionData: TGetDataFromState<TData<TPositionItem>>
}

type NewPropType = Merge<TGetDataFromState<TGroupItem | null>, Props>

export const fields = [
  'name'
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
