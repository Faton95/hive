import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
import { FieldArray } from 'react-final-form-arrays'
import { prop, propOr } from 'ramda'
import styled from 'styled-components'
import { FieldWrapper } from '../../../components/StyledElems'
import {
  ClientListField,
  InputField,
  UniversalMultiSelectField
} from '../../../components/Form'
import * as API from '../../../constants/api'
import CreateCancelButtons from '../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../constants/routes'

const RowMargin = styled(Row)`
  margin-bottom: 20px;
`

const EMPTY = ''

const OutsourceCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <RowMargin gutter={20}>
        <Col span={12}>
          <Field
            label="Name"
            name="name"
            component={InputField}
            placeholder="Name"
          />
        </Col>
        <Col span={12}>
          <Field
            label="Address"
            name="address"
            component={InputField}
            placeholder="Address"
          />
        </Col>
      </RowMargin>
      <RowMargin gutter={20}>
        <Col span={12}>
          <Field
            label="Email"
            name="email"
            component={InputField}
            placeholder="Email"
          />
        </Col>
        <Col span={12}>
          <Field
            label="Password"
            name="password"
            component={InputField}
            placeholder="Password"
          />
        </Col>
      </RowMargin>
      <FieldWrapper>
        <Field
          label="Tags"
          name="tags"
          component={UniversalMultiSelectField}
          api={API.TAGS_LIST}
        />
      </FieldWrapper>
      <FieldArray
        name="contacts"
        component={ClientListField}
      />
      <CreateCancelButtons
        cancelPath={ROUTES.OUTSOURCE_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default OutsourceCreateForm
