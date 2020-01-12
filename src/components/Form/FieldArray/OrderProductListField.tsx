import React from "react";
import styled from 'styled-components'
import {pathOr, path, propOr, map} from 'ramda'
import { Field , UniversalSearchField, InputField } from '../index'

import RemoveButton from '../FieldArray/RemoveButton'
import { Row, Col } from '../../UI'
import { Table, TableRow, TableCol, TableHeader, TableBody, TableColRight as TableColUI } from '../../Table'
import * as API from '../../../constants/api'
import numberFormat from '../../../utils/numberFormat'
import toNumber from '../../../utils/toNumber'
import FieldArrayHeader from './FieldArrayHeader'


const HeaderRow = styled(TableRow)`
  padding-left: 30px;
`

const TableColRight = styled(TableColUI)`
  align-self: center;
`

const Inp = styled(InputField)
const OrderProductListField = props => {

  const { fields, ...p } = props

  const onAdd = () => fields.push({})
  const onRemove = index => fields.remove(index)

    const values: [] = propOr([], 'value', fields)
    const productIds = map(path(['product', 'id']), values)
  return (
    <div>
      <FieldArrayHeader title={'Товары'} onAdd={onAdd}/>
      <Table gutter={20} list={productIds} selection={false}>
        <TableHeader>
          <HeaderRow>
            <TableCol span={7}>Тип</TableCol>
            <TableCol span={8}>Товар</TableCol>
            <TableColRight span={3}>Цена</TableColRight>
            <TableCol span={2}>Кол-во</TableCol>
            <TableColRight span={3}>Сумма</TableColRight>
            <TableCol span={1} />
          </HeaderRow>
        </TableHeader>
        <TableBody>
          {fields.map((name, index) => {
            const price = toNumber(path([index, 'product', 'price'], values))
            const amount = toNumber(path([index, 'amount'], values))
            const totalPrice = price * amount
            return (
              <TableRow key={index}>
                <TableCol span={7} data-cy={`product-${index}`}>
                  <Field
                    name={`${name}.type`}
                    component={UniversalSearchField}
                    api={API.PRODUCT_TYPE_LIST}
                  />
                </TableCol>
                <TableCol span={8} data-cy={`count-${index}`}>
                  <Field
                    name={`${name}.product`}
                    component={UniversalSearchField}
                    api={API.PRODUCT_LIST}
                  />
                </TableCol>
                <TableColRight span={3} ><span>{numberFormat(price)}</span></TableColRight>
                <TableCol span={2}>
                  <Field
                    name={`${name}.amount`}
                    rtl={true}
                    component={InputField}
                  />
                </TableCol>
                <TableColRight span={3}>{numberFormat(totalPrice)}</TableColRight>
                <TableColRight span={1}>
                  <RemoveButton onRemove={() => onRemove(index)} />
                </TableColRight>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderProductListField
