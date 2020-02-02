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
import { TContractItem } from 'types/models'
import { TGetDataFromState, TUseDelete } from 'types'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`
const Date = styled.div`
  color: #8F9BB0;
`
const RowMargin = styled(Row)`
  margin-bottom: 20px;
`

type Props = {
  item: TGetDataFromState<TContractItem>;
  deleteData: TUseDelete;
  onEdit: (id) => void;
}
const ContractDetail: FunctionComponent<Props> = props => {
  const {
    item,
    deleteData,
    onEdit
  } = props

  const details = prop('data', item)
  const id = prop('id', details)
  const creatredDate = dateFormat(prop('createdDate', details))
  const client = path(['client', 'name'], details)
  const branch = path(['branch', 'name'], details)
  const currency = path(['currency', 'name'], details)
  const paymentDuration = path(['paymentDuration'], details)
  const deadline = dateFormat(path(['deadLine'], details))
  const successFee = numberFormat(path(['successFee'], details))
  const billingType = path(['billingType'], details)
  const fixedFeeAmount = numberFormat(path(['fixedFeeAmount'], details))
  const hourlyFeeCeiling = numberFormat(path(['hourlyFeeCeiling'], details))
  const bankAccountId = path(['bankAccount', 'id'], details)
  const bankAccountName = path(['bankAccount', 'name'], details)
  const bankAccountCode = path(['bankAccount', 'code'], details)
  const bankAccountAddress = path(['bankAccount', 'address'], details)
  const bankAccountDetails = path(['bankAccount', 'bankDetails'], details)

  return (
    <>
      <DetailMenu title={'Contract №' + id} />
      <Box padding="25px">
        <Header alignItems="center" justifyContent="space-between">
          <Date>
           Created: {creatredDate}
          </Date>
          <DetailDropdown marginLeft="50px">
            <DropdownItem onClick={() => onEdit(id)} toggleMenu={() => null}>Изменить</DropdownItem>
            <DropdownItem onClick={() => deleteData.onSubmit(id)} toggleMenu={() => null}>Удалить</DropdownItem>
          </DetailDropdown>
        </Header>

        <RowMargin gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="client">{client}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="branch">{branch}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="currency">{currency}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="payment duration">{paymentDuration} days</LabeledValue>
          </Col>
        </RowMargin>
        <RowMargin gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Deadline">{deadline}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="success Fee">{successFee}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label={`${billingType === 'fixed_fee' ? "Fixed Fee Amount" : "Hourly Fee ceiling"}`}>
              {billingType === 'fixed_fee' ? fixedFeeAmount : hourlyFeeCeiling}
            </LabeledValue>
          </Col>
          <Col span={6}></Col>
        </RowMargin>
        <h3>Bank Account</h3>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCol span={1}>#</TableCol>
                <TableCol span={5}>name</TableCol>
                <TableCol span={5}>code</TableCol>
                <TableCol span={5}>address</TableCol>
                <TableCol span={8}>bank details</TableCol>
              </TableRow>
            </TableHeader>
            <TableBody>
                  <TableRow align="center">
                    <TableCol span={1}>{bankAccountId}</TableCol>
                    <TableCol span={5}>{bankAccountName}</TableCol>
                    <TableCol span={5}>{bankAccountCode}</TableCol>
                    <TableCol span={5}>{bankAccountAddress}</TableCol>
                    <TableCol span={8}>{bankAccountDetails}</TableCol>
                  </TableRow>
            </TableBody>
          </Table>
        </div>
      </Box>
    </>
  )
}

export default ContractDetail
