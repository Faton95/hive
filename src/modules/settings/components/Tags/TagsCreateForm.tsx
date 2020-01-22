import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
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
const getClientText = client => {
  const name = propOr(EMPTY, 'fullName', client)
  const phone = prop('phoneNumber', client)

  return phone + ' - ' + name
}

const TagsCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <FieldWrapper>
        <Field label="Имя" name="name" component={InputField} />
      </FieldWrapper>
      <CreateCancelButtons
        cancelPath={ROUTES.TAGS_LIST_PATH}
        submitText="Сохранить"
      />
    </form>
  )
}

export default TagsCreateForm
