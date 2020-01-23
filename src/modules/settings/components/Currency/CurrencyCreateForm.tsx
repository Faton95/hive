import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
import { FieldArray } from 'react-final-form-arrays'
import { prop, propOr } from 'ramda'
import styled from 'styled-components'
import { FieldWrapper } from '../../../../components/StyledElems'
import {
  UniversalSearchField,
  InputField
} from '../../../../components/Form'
import * as API from '../../../../constants/api'
import CreateCancelButtons from '../../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../../constants/routes'

const RowMargin = styled(Row)`
  margin-bottom: 20px;
`

const EMPTY = ''
const getClientText = (client) => {
  const name = propOr(EMPTY, 'fullName', client)
  const phone = prop('phoneNumber', client)

  return phone + ' - ' + name
}

const CurrencyCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field
          label="Name"
          name="name"
          component={InputField}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Sign"
          name="sign"
          component={InputField}
        />
      </FieldWrapper>
      <CreateCancelButtons
        cancelPath={ROUTES.CURRENCY_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default CurrencyCreateForm
