import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
import { FieldArray } from 'react-final-form-arrays'
import styled from 'styled-components'
import { FieldWrapper } from 'components/StyledElems'
import {
  ClientListField,
  InputField,
  UniversalMultiSelectField
} from 'components/Form'
import * as API from 'constants/api'
import CreateCancelButtons from 'components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from 'constants/routes'

const RowMargin = styled(Row)`
  margin-bottom: 20px;
`

const ClientCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <RowMargin gutter={20}>
        <Col span={12} data-cy='name-wrapper'>
          <Field
            label='Name'
            name='name'
            component={InputField}
            placeholder='Name'
          />
        </Col>
        <Col span={12} data-cy='address-wrapper'>
          <Field
            label='Address'
            name='address'
            component={InputField}
            placeholder='Address'
          />
        </Col>
      </RowMargin>
      <RowMargin gutter={20}>
        <Col span={12} data-cy='email-wrapper'>
          <Field
            label='Email'
            name='email'
            component={InputField}
            placeholder='Email'
          />
        </Col>
        <Col span={12} data-cy='password-wrapper'>
          <Field
            label='Password'
            name='password'
            component={InputField}
            placeholder='Password'
          />
        </Col>
      </RowMargin>
      <FieldWrapper data-cy='tags-wrapper'>
        <Field
          label='Tags'
          name='tags'
          component={UniversalMultiSelectField}
          api={API.TAGS_LIST}
        />
      </FieldWrapper>
      <FieldArray
        name='contacts'
        component={ClientListField}
      />
      <CreateCancelButtons
        cancelPath={ROUTES.CLIENT_LIST_PATH}
        submitText='Save'
      />
    </form>
  )
}

export default ClientCreateForm
