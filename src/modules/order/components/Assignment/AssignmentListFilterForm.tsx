import React from 'react'
import * as CONST from '../../../../constants/backend'
import { Col, Row } from '../../../../components/UI'
import {
  Field,
  UniversalStaticSelectField,
  ClientSearchField
} from '../../../../components/Form'

export const fields = ['status', 'client']
const AssignmentListFilterForm = props => {
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
          component={ClientSearchField}
          name="client"
          label="Клиелт"
        />
      </Col>
    </Row>
  )
}

export default AssignmentListFilterForm
