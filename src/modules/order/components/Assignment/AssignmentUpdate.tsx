import React, { FunctionComponent } from 'react'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'
import {TData, TGetDataFromState, TOnSubmit, TPositionItem} from 'types'
import { TOrderItem } from 'types/models'
import { Merge } from 'types/utils'
import AssignmentCreateForm from './AssignmentCreateForm'

type Props = {
  onSubmit: TOnSubmit;
  initialValues: object;
  id: string;
  positionData: TGetDataFromState<TData<TPositionItem>>;
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

const AssignmentUpdate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title={`Updatte assignment № A${props.id}`} />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.initialValues}
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

export default AssignmentUpdate
