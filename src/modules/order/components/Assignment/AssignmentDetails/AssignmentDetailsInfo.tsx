import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { path, prop, map } from 'ramda'
import dateFormat from 'utils/dateFormat'
import numberFormat from 'utils/numberFormat'
import { DetailMenu } from 'components/Menu'
import { DisplayFlex } from 'components/StyledElems'
import {
  LabeledValue,
  DetailDropdown
} from 'components/DetailComponents'
import { Box, DropdownItem, Row, Col } from 'components/UI'
import {
  TableRow,
  Table,
  TableCol,
  TableBody,
  TableHeader
} from 'components/Table'
import { TOrderItem, TOrderProduct } from 'types/models'
import { TGetDataFromState } from 'types'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`

const EMPTY_ARR = []

type Props = {
    item;
}
const OrderDetail: FunctionComponent<Props> = props => {
  const {
    item,
  } = props

  const details = prop('data', item)
  const id = prop('id', details)
  const client = path(['client', 'name'], details)
  const branch = path(['branch', 'name'], details)
  const createdDate = dateFormat(path(['createdDate'], details))
  const originatedBy = path(['originatedBy', 'username'], details)
  const workGroup = path(['workGroup', 'username'], details)
  const billingType = path(['billingType'], details)
  const paymentDestination = path(['paymentDestination'], details)
  console.warn('dd', details)
  return (
    <>
      <Box padding="25px">

        <Row gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Client">{client}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Client Contact">paymentType</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Contract">3321</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Branch">{branch}</LabeledValue>
          </Col>
        </Row>
        <br />
        <Row gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Created date">{createdDate}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Originated by">{originatedBy}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Work group">{workGroup}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Billing type">{billingType}</LabeledValue>
          </Col>
        </Row>
        <br />
        <Row gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="payment destination">{paymentDestination}</LabeledValue>
          </Col>
        </Row>
        <br />
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCol span={16}>Наименование</TableCol>
                <TableCol span={3}>Цена</TableCol>
                <TableCol span={2}>Кол-во</TableCol>
                <TableCol span={3}>Сумма</TableCol>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow align="center">
                <TableCol span={16}>123</TableCol>
                <TableCol span={3}>2</TableCol>
                <TableCol span={2}>222</TableCol>
                <TableCol span={3}>333</TableCol>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Box>
    </>
  )
}

export default OrderDetail
