import React from 'react'
import * as CONST from '../../../../constants/backend'
import * as API from '../../../../constants/api'
import { Col, Row } from '../../../../components/UI'
import {
  Field,
  ClientSearchField,
  UniversalSearchField,
  DateRangeField
} from '../../../../components/Form'

export const fields = ['branch', 'client', 'range']
const ContractListFilterForm = props => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <Field
          component={UniversalSearchField}
          name="branch"
          label="Branch"
          api={API.BRANCH_LIST}
        />
      </Col>
      <Col span={6}>
        <Field
          component={UniversalSearchField}
          name="client"
          label="Client"
          api={API.CLIENT_LIST}
        />
      </Col>
      <Col span={6}>
        <Field
          component={DateRangeField}
          name="range"
          label="From-TO"
        />
      </Col>
    </Row>
  )
}

export default ContractListFilterForm
