import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import { TGetDataFromState, TOnSubmit, Merge, TIdName, TGroupItem, TData } from 'types'

import ContractCreateForm from './AssignmentCreateForm'

type Props = {
  onSubmit: TOnSubmit,
  groupData: TGetDataFromState<TData<TGroupItem>>
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
              groupData={props.groupData}

            />
          )}
        />
      </Box>
    </div>
  )
}

export default ContractCreate
