import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import { DetailMenu } from 'components/Menu/index'
import { Box } from 'components/UI'

import { TGetDataFromState, TOnSubmit, Merge, TGroupItem, TData, TPositionItem } from 'types'

import AssignmentCreateForm from './AssignmentCreateForm'
import isEqual from "react-fast-compare";

type Props = {
  onSubmit: TOnSubmit;
  positionData: TGetDataFromState<TData<TPositionItem>>;
}

type NewPropType = Merge<TGetDataFromState<TGroupItem | null>, Props>

export const fields = [
  'name',
  'client',
  'branch',
  'tags',
  'originatedBy',
  'teamLeader',
  'workGroup',
  'paymentDestination',
  'bankAccount',
  'currency',
  'contract'
]
const ContractCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title='Assignment Create' />
      <Box padding='25px'>
        <Form
          onSubmit={props.onSubmit}
          render={formikProps => (
            <AssignmentCreateForm
              {...formikProps}
              positionData={props.positionData}
            />
          )}
        />
      </Box>
    </div>
  )
}

export default React.memo(ContractCreate, isEqual)
