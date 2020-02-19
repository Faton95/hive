import { PAYMENT_TYPE_LIST } from 'constants/backend'
import React, { FunctionComponent, useState } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'
import { FieldArray } from 'react-final-form-arrays'
import { prop, propOr } from 'ramda'
import styled from 'styled-components'
import ImageUpload from 'components/UI/ImageUpload/ImageUploadField'
import Eye from 'icons/view.svg'
import { FieldWrapper } from '../../../../components/StyledElems'

import {
  UniversalSearchField,
  InputField, UniversalStaticSelectField
} from '../../../../components/Form'
import * as API from '../../../../constants/api'
import CreateCancelButtons from '../../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../../constants/routes'

const RowMargin = styled(Row)`
  margin-bottom: 20px;
  position: relative;
`
const ShowHideButton = styled.img`
  position: absolute;
  top: 45%;
  left: 45.5%;
  border-radius: 4px;
  cursor: pointer;
  height: 30px;
  width: 40px;
`

const EMPTY = ''

const StaffCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props
  const [show, setShow] = useState(false)
  return (
    <form onSubmit={handleSubmit}>
      <RowMargin gutter={20}>
        <Col span={2}>
          <Field
            name="photo"
            component={ImageUpload}
          />
        </Col>
        <Col span={10}>
          <Field
            label="Username"
            name="username"
            component={InputField}
            placeholder="Username"
          />
        </Col>
        <Col span={12} />
      </RowMargin>
      <RowMargin gutter={20}>
        <Col span={12}>
          <Field
            label="Full Name"
            name="full_name"
            component={InputField}
            placeholder="Full name"
          />
        </Col>
        <Col span={12} />
      </RowMargin>
      <RowMargin gutter={20}>
        <Col span={12}>
          <Field
            label="Position"
            name="position"
            component={UniversalSearchField}
            api={API.POSITION_LIST}
          />
        </Col>
        <Col span={12} />
      </RowMargin>
      <RowMargin gutter={20}>
        <Col span={12}>
          <Field
            label="Пароль"
            name="password"
            component={InputField}
            type={show === true ? 'text' : 'password'}
            placeholder="Password"
          />
          <ShowHideButton onClick={() => setShow(!show)} src={Eye} alt="eye" />
        </Col>
        <Col span={12} />
      </RowMargin>
      <CreateCancelButtons
        cancelPath={ROUTES.STAFF_LIST_PATH}
        submitText="Save"
      />
    </form>
  )
}

export default StaffCreateForm
