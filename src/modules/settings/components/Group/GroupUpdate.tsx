import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import {
  Form,
} from 'react-final-form'
import { DetailMenu } from '../../../../components/Menu'
import { Box } from '../../../../components/UI'

import { TGetDataFromState, TOnSubmit, TIdName, TData } from '../../../../types'
import { TGroupItem } from '../../../../types/models'
import { Merge } from '../../../../types/utils'
import GroupCreateForm from './GroupCreateForm'

type Props = {
    onSubmit: TOnSubmit;
    initialValues: object;
    id: string;
    permissionData: TGetDataFromState<TData<TIdName>>
}

type NewPropType = Merge<TGetDataFromState<TGroupItem | null>, Props>

const GroupUpdate: FunctionComponent<NewPropType> = props => {
  const {permissionData} = props
  return (
    <div>
      <DetailMenu title={`Update group №${props.id}`} />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          initialValues={props.initialValues}
          render={formikProps => (
            <GroupCreateForm
              permissionData={props.permissionData}
              {...formikProps}
            />
          )}
        />
      </Box>
    </div>
  )
}

export default GroupUpdate
