import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
import { FieldArray } from 'react-final-form-arrays'
import { prop, propOr } from 'ramda'
import styled from 'styled-components'
import { FieldWrapper } from '../../../../components/StyledElems'
import {
  UniversalSearchField,
  InputField,
  UniversalMultiSelectField,
  TextArea
} from '../../../../components/Form'
import * as API from '../../../../constants/api'
import CreateCancelButtons from '../../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../../constants/routes'

const RowMargin = styled(Row)`
  margin-bottom: 20px;
`

const EMPTY = ''

const BankAccountCreateForm: FunctionComponent<FormRenderProps> = props => {
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
          label="Code"
          name="code"
          component={InputField}
          placeholder="Code"
        />
        </Col>
      </RowMargin>
      <FieldWrapper>
        <Field
            label="Branch"
            name="branch"
            component={UniversalSearchField}
            api={API.BRANCH_LIST}
          />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Currencies"
          name="currency"
          api={API.CURRENCY_LIST}
          component={UniversalMultiSelectField} 
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Address"
          name="address"
          component={InputField}
          placeholder="Address"
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="bankDetails"
          name="bankDetails"
          component={TextArea}
          placeholder="Bank details"
        />
      </FieldWrapper>
      <CreateCancelButtons
        cancelPath={ROUTES.BANK_ACCOUNT_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default BankAccountCreateForm
