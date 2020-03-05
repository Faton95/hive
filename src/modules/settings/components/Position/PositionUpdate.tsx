import React, { FunctionComponent } from 'react'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import { TGetDataFromState, TOnSubmit } from 'types'
import { TOrderItem } from 'types/models'
import { Merge } from 'types/utils'
import PositionCreateForm from './PositionCreateForm'

type Props = {
  onSubmit: TOnSubmit;
  initialValues: object;
  id: string;
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

const PositionUpdate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Update Position" />
      <Box padding="25px">
        <Form
          keepDirtyOnReinitialize={true}
          onSubmit={props.onSubmit}
          initialValues={props.initialValues}
          render={(formikProps) => (
            <PositionCreateForm {...formikProps} />
          )}
        />
      </Box>
    </div>
  )
}

export default PositionUpdate
