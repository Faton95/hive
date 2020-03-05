import React, { FunctionComponent } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'ui-cubic/dist/index.es'

import styled from 'styled-components'
import ImageUpload from 'components/UI/ImageUpload/ImageUploadField'

import {
  UniversalSearchField,
  InputField, InputPasswordField
} from '../../../../components/Form'
import * as API from '../../../../constants/api'
import CreateCancelButtons from '../../../../components/UI/Buttons/CreateCancelButtons'
import * as ROUTES from '../../../../constants/routes'

const RowMargin = styled(Row)`
  margin-bottom: 20px;
  position: relative;
`

const StaffCreateForm: FunctionComponent<FormRenderProps> = props => {
  const { handleSubmit } = props
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
            name="fullName"
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
            label="Role"
            name="role"
            component={UniversalSearchField}
            params={{page_size: 11}}
            api={API.ROLE_LIST}
          />
        </Col>
        <Col span={12} />
      </RowMargin>
      <RowMargin gutter={20}>
        <Col span={12}>
          <Field
            label="Пароль"
            name="password"
            component={InputPasswordField}
            placeholder="Password"
          />
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
