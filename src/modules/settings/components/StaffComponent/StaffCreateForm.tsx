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

const StaffCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field
          label="Username"
          name="username"
          component={InputField}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Field
          label="Password"
          name="password"
          component={InputField}
        />
      </FieldWrapper>
        <FieldWrapper>
        <Field
            label="Position"
            name="position"
            component={UniversalSearchField}
            api={API.POSITION_LIST}
        />
        </FieldWrapper>
        <FieldWrapper>
            <Field
                label="Rate"
                name="rate"
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

export default StaffCreateForm
