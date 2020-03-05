import React from 'react'
import * as CONST from 'constants/backend'
import * as API from 'constants/api'
import { Col, Row } from 'components/UI'
import {
  Field,
  UniversalStaticSelectField,
  UniversalSearchField
} from 'components/Form'

export const fields = ['status', 'client']
const RoleListFilterForm = props => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <Field
          component={UniversalStaticSelectField}
          list={CONST.ORDER_STATUS_LIST}
          name="status"
          label="Статус"
        />
      </Col>
      <Col span={6}>
        <Field
          component={UniversalSearchField}
          name="client"
          label="Клиелт"
          api={API.ORDER_LIST}
        />
      </Col>
    </Row>
  )
}

export default RoleListFilterForm
