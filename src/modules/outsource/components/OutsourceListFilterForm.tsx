import React from 'react'
import * as CONST from '../../../constants/backend'
import * as API from '../../../constants/api'
import { Col, Row } from '../../../components/UI'
import {
  Field,
  UniversalSearchField
} from '../../../components/Form'

export const fields = ['tags']
const OutsourceListFilterForm = props => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <Field
          component={UniversalSearchField}
          api={API.TAGS_LIST}
          name="tags"
          label="Tags"
        />
      </Col>
      <Col span={6}>
      </Col>
    </Row>
  )
}

export default OutsourceListFilterForm
