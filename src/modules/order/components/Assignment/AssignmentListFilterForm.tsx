import React from 'react'
import { Col, Row, RowMargin } from 'components/UI/Grid'
import {
  Field,
  UniversalStaticSelectField,
  UniversalSearchField,
  CheckboxBordered
} from '../../../../components/Form'
import * as API from '../../../../constants/api'

export const fields = ['contract', 'client', 'branch', 'teamLeader', 'isBillable']
const AssignmentListFilterForm = props => {
  return (
    <>
      <RowMargin gutter={20}>
        <Col span={8}>
          <Field
            component={UniversalSearchField}
            name="contract"
            label="contract"
            api={API.CONTRACT_LIST}
          />
        </Col>
        <Col span={8}>
          <Field
            component={UniversalSearchField}
            name="client"
            label="client"
            api={API.CLIENT_LIST}
          />
        </Col>
        <Col span={8}>
          <Field
            component={UniversalSearchField}
            name="branch"
            label="Branch"
            api={API.BRANCH_LIST}
          />
        </Col>
      </RowMargin>
      <RowMargin gutter={20}>
        <Col span={8}>
          <Field
            component={UniversalSearchField}
            name="teamLeader"
            label="Team Leader"
            api={API.STAFF_LIST}
          />
        </Col>
        <Col span={8}>
          <Field
            name="isBillable"
            label={{ checkbox: 'Billable', field: 'Billing' }}
            component={CheckboxBordered}
            defaultValue={true}
            type="checkbox"
          />
        </Col>
        <Col span={8}/>
      </RowMargin>
    </>
  )
}

export default AssignmentListFilterForm
