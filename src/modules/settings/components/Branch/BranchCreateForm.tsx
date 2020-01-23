import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
import { prop, propOr } from 'ramda'
import styled from 'styled-components'
import { FieldWrapper } from '../../../../components/StyledElems'
import { UniversalSearchField, InputField } from '../../../../components/Form'
import * as API from '../../../../constants/api'
import CreateCancelButtons from '../../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../../constants/routes'


const BranchCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field label="Name" name="name" component={InputField} />
      </FieldWrapper>
      <CreateCancelButtons
        cancelPath={ROUTES.BRANCH_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default BranchCreateForm
