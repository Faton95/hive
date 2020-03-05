import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldWrapper } from '../../../components/StyledElems'
import {
  UniversalSearchField,
  TextArea
} from '../../../components/Form'
import * as API from '../../../constants/api'
import CreateCancelButtons from '../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../constants/routes'

const TimeSheetCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field
          label="Assignment"
          name="assignment"
          component={UniversalSearchField}
          api={API.ASSIGNMENT_LIST}
        />
      </FieldWrapper>
      <Field
        label="Description"
        name="description"
        component={TextArea}
      />
      <CreateCancelButtons
        submitText="Save"
      />
    </form>
  )
}

export default TimeSheetCreateForm
