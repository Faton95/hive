import React, { FunctionComponent } from 'react'
import arrayMutators from 'final-form-arrays'
import { Form } from 'react-final-form'
import { DetailMenu } from '../../../../components/Menu'
import { Box } from '../../../../components/UI'

import { TGetDataFromState, TOnSubmit } from '../../../../types'
import { TIdName } from '../../../../types/models'
import { Merge } from '../../../../types/utils'
import TagsCreateForm from './TagsCreateForm'

type Props = {
  onSubmit: TOnSubmit;
};

type NewPropType = Merge<TGetDataFromState<TIdName | null>, Props>;

export const fields = ['name']
const TagsCreate: FunctionComponent<NewPropType> = props => {
  return (
    <div>
      <DetailMenu title="tags" />
      <Box padding="25px">
        <Form
          onSubmit={props.onSubmit}
          mutators={{ ...arrayMutators }}
          component={TagsCreateForm}
        />
      </Box>
    </div>
  )
}

export default TagsCreate
