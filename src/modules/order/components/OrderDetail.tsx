import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { path, prop, map } from 'ramda'
import dateFormat from '../../../utils/dateFormat'
import numberFormat from '../../../utils/numberFormat'
import { DetailMenu } from '../../../components/Menu'
import { DisplayFlex } from '../../../components/StyledElems'
import {
  LabeledValue,
  DetailDropdown
} from '../../../components/DetailComponents'
import { Box, DropdownItem, Row, Col } from '../../../components/UI'
import {
  TableRow,
  Table,
  TableCol,
  TableBody,
  TableHeader
} from '../../../components/Table'
import { TOrderItem, TOrderProduct } from '../../../types/models'
import { TGetDataFromState } from '../../../types'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`

const EMPTY_ARR = []

type Props = {
  item: TGetDataFromState<TOrderItem>;
  onDelete: (id) => void;
  onEdit: (id) => void;
}
const OrderDetail: FunctionComponent<Props> = props => {
  const {
    item,
    onDelete,
    onEdit
  } = props

  const details = prop('data', item)
  const id = prop('id', details)
  const status = prop('status', details)

  const clientName = path(['client', 'fullName'], details)
  const paymentType = prop('paymentType', details)
  const createdDate = prop('createdDate', details)
  const products = prop('orderProducts', details) || EMPTY_ARR
  const productIds = map(prop('id'), products)

  return (
    <>
      <DetailMenu title={'Заказ №' + id} />
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
          <Col span={6}>
            <LabeledValue labelMargin={5} label="СТАТУС">{status}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Data zakaza">{dateFormat(createdDate)}</LabeledValue>
          </Col>
        </Row>

        <div>
          <Table list={productIds}>
            <TableHeader>
              <TableRow>
                <TableCol span={16}>Наименование</TableCol>
                <TableCol span={3}>Цена</TableCol>
                <TableCol span={2}>Кол-во</TableCol>
                <TableCol span={3}>Сумма</TableCol>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: TOrderProduct, index) => {
                const name = product.product.name
                return (
                  <TableRow key={index} align="center">
                    <TableCol span={16}>{name}</TableCol>
                    <TableCol span={3}>{numberFormat(product.price)}</TableCol>
                    <TableCol span={2}>{product.amount}</TableCol>
                    <TableCol span={3}>{numberFormat(product.amount * product.price)}</TableCol>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Box>
    </>
  )
}

export default OrderDetail
