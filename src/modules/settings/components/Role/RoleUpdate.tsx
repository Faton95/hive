import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from 'components/Menu'
import { Box } from 'components/UI'

import { TGetDataFromState, TGroupItem, TOnSubmit } from 'types'
import { TOrderItem } from 'types/models'
import { Merge } from 'types/utils'
import RoleCreateForm from './RoleCreateForm'

type Props = {
  onSubmit: TOnSubmit;
  initialValues: object;
  id: string;
  groups: TGetDataFromState<TGroupItem>;
}

type NewPropType = Merge<TGetDataFromState<TOrderItem | null>, Props>

const RoleUpdate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="Update Role" />
      <Box padding="25px">
        <Form
          keepDirtyOnReinitialize={true}
          onSubmit={props.onSubmit}
          initialValues={props.initialValues}
          mutators={{ ...arrayMutators }}
          render={(formikProps) => (
            <RoleCreateForm {...formikProps} groups={props.groups} />
          )}
        />
      </Box>
    </div>
  )
}

export default RoleUpdate
