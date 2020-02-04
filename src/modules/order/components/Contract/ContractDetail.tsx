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
  display: flex;
`
const RowMargin = styled(Row)`
  margin-bottom: 20px;
  margin-top: 20px;
`
const CreatedDate = styled.span`
  background-color: #F7F8FA;
  padding: 5px 7px;
  border-radius: 12.5px;
  margin-right: 20px;
`
const StyledDate = styled.div`
  color: #8F9BB0;
  margin-right: 10px;
`
const PreHeader = styled.div`
  display: flex;
  align-items: center;
`
const PaymentDetail = styled.span`
  padding-bottom: 2px;
  border-bottom: 1px dashed #8F9BB0
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
  const bankAccountName = path(['bankAccount', 'name'], details)

  return (
    <>
      <DetailMenu title={'Contract №' + id} />
      <Box padding="25px">
        <Header alignItems="center" justifyContent="space-between">
          <Date>
            <StyledDate>
              Deadline: 
            </StyledDate> 
            <div>
              {deadline}
            </div>
          </Date>
          <DetailDropdown marginLeft="50px">
            <DropdownItem onClick={() => onEdit(id)} toggleMenu={() => null}>Изменить</DropdownItem>
            <DropdownItem onClick={() => deleteData.onSubmit(id)} toggleMenu={() => null}>Удалить</DropdownItem>
          </DetailDropdown>
        </Header>
        <PreHeader>
        <CreatedDate>
          # {id}
        </CreatedDate>
        <Date>
            <StyledDate>
              Created date: 
            </StyledDate> 
            <div>
              {creatredDate}
            </div>
          </Date>
        </PreHeader>
        <RowMargin gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="client">{client}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="branch">{branch}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="bank">{bankAccountName} - {currency}</LabeledValue>
          </Col>
          <Col span={6}>
          </Col>
        </RowMargin>
        <RowMargin gutter={10}>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Billing type">{billingType === 'fixed_fee' ? "Fixed Fee Amount" : "Hourly Fee ceiling"}</LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label={`${billingType === 'fixed_fee' ? "Fixed Fee Amount" : "Hourly Fee ceiling"}`}>
              {billingType === 'fixed_fee' ? fixedFeeAmount : hourlyFeeCeiling}
            </LabeledValue>
          </Col>
          <Col span={6}>
            <LabeledValue labelMargin={5} label="Success fee">{successFee}</LabeledValue>
          </Col>
          <Col span={6}></Col>
        </RowMargin>
        <PaymentDetail>Payment expected in <b>{paymentDuration}</b> days after invoice delivery.</PaymentDetail>
      </Box>
    </>
  )
}

export default ContractDetail
