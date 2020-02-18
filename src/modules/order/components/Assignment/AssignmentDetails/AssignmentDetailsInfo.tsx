import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { path, prop, map, pathOr } from 'ramda'
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
const MarginBottom = styled(Row)`
  margin-bottom: 40px;
`
const HighLight = styled.div`
  background-color: rgba(82, 97, 149, 0.1);;
  padding: 5px 7px; 
  border-radius: 4px;
  width: fit-content;
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
  const contract = prop('contract', details)
  const branch = path(['branch', 'name'], details)
  const createdDate = dateFormat(path(['createdDate'], details))
  const originatedBy = path(['originatedBy', 'username'], details)
  const workGroups = pathOr([], ['workGroup'], details)
  const workGroup = map(path(['fullName']), workGroups)
  const billingType = path(['billingType'], details)
  const paymentDestination = path(['paymentDestination'], details)
  console.warn('dd', details)
  return (
    <>
        <MarginBottom gutter={10}>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="Client">{client}</LabeledValue>
          </Col>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="Client Contact">placeholder</LabeledValue>
          </Col>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="Contract">{contract}</LabeledValue>
          </Col>
          
        </MarginBottom>
        <MarginBottom gutter={10}>
        <Col span={8}>
            <LabeledValue labelMargin={5} label="Branch">{branch}</LabeledValue>
          </Col>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="Created date">{createdDate}</LabeledValue>
          </Col>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="Originated by">{originatedBy}</LabeledValue>
          </Col>
        </MarginBottom>
        <MarginBottom gutter={10}>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="payment destination">{paymentDestination}</LabeledValue>
          </Col>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="Work group">
                <HighLight>
                  {workGroup}
                </HighLight>
              </LabeledValue>
          </Col>
          <Col span={8}>
            <LabeledValue labelMargin={5} label="Billing type">
              {billingType === 'fixed_fee' ? "Fixed Fee" : 'Hourly billing'}
            </LabeledValue>
          </Col>
        </MarginBottom>
    </>
  )
}

export default OrderDetail
