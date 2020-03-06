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
import { TOrderItem, TOrderProduct } from 'types/models'
import { TGetDataFromState } from 'types'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`

const EMPTY_ARR = []

type Props = {
  data: TGetDataFromState<any>;
  onDelete: (id) => void;
  onEdit: (id) => void;
}
const InvoiceDetail: FunctionComponent<Props> = props => {
  const {
    data,
    onDelete,
    onEdit
  } = props

  const details = prop('data', data)
  const id = prop('id', details)
  const status = prop('status', details)

  console.warn(details)
  const clientName = path(['client', 'fullName'], details)
  const paymentType = prop('paymentType', details)
  const createdDate = prop('createdDate', details)
  const products = prop('orderProducts', details) || EMPTY_ARR
  const productIds = map(prop('id'), products)

  return (
    <>
      <DetailMenu title={'№' + id} />
      <Box padding="25px">
        <Header alignItems="center" justifyContent="flex-end">
          <DetailDropdown marginLeft="50px">
            <DropdownItem onClick={() => onEdit(id)} toggleMenu={() => null}>Изменить</DropdownItem>
            <DropdownItem onClick={() => onDelete(id)} toggleMenu={() => null}>Удалить</DropdownItem>
          </DetailDropdown>
        </Header>

        <Row gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Клиент">{clientName}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="ТИП ОПЛАТИ">{paymentType}</LabeledValue>
          </Col>
        </Row>
      </Box>
    </>
  )
}

export default InvoiceDetail
