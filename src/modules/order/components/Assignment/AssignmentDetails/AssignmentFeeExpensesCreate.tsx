import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { TAssignmentItem, TData, TGetDataFromState, TRateItem, TStaffItem } from 'types'
import { TFeeItem, TExpenseItem } from 'types/models'
import { Table, TableBody, TableCol, TableHeader, TableRow } from 'components/Table'
import {filter, find, groupBy, map, path, pathOr, pipe, prop, propOr, sum, values, equals, union} from 'ramda'
import addTime from 'utils/addTime'
import toNumber from 'utils/toNumber'
import { TUseCreateModal } from 'types/hooks'
import useUserPosition from 'hooks/useUserPosition'
import equal from 'react-fast-compare'
import { RateContext } from 'etc/context'
import numberFormat from 'utils/numberFormat'
import AssignmentExpenseModal from './AssignmentExpenseModal'
import AssignmentFeeModal from './AssignmentFeeModal'

const ProgressContainer = styled.div`
  background: rgba(174, 179, 246, 0.15);
  border: 1px solid #AEB3F7;
  border-radius: 5px;
  height: 25px;
  width: calc(100% - 170px);
  position: relative;
`

const Progress = styled.div<{width: number}>`
background: #AEB3F7;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.width}%;
`

const Percent = styled.div`
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
`
const AddFees = styled.span`
  display: inline-block;
  color: #6770E6;
  cursor: pointer;
  font-weight: 500;
  margin-left: 25px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  align-items: center;
 
`
type Props = {
  feeData: TGetDataFromState<TData<TFeeItem>>;
  expenseData: TGetDataFromState<TData<TExpenseItem>>;
  onExpenseCreate: TUseCreateModal<TFeeItem>;
  onFeeCreate: TUseCreateModal<TFeeItem>;
  details: TAssignmentItem;
}

export const fields = [
  'fees',
  'expenses'
]

const HUND = 100
const EMPTY_ARR = []
const AssignmentFeeExpensesCreate: FunctionComponent<Props> = props => {
  const {
    onFeeCreate,
    onExpenseCreate,
    expenseData,
    feeData,
    details
  } = props

  const userPosition = useUserPosition()

  const teamLeader = prop('teamLeader', details)
  const workGroup = pipe(propOr(EMPTY_ARR, 'workGroup'), union([teamLeader]), filter(Boolean))(details)

  const fees = pathOr<TFeeItem[]>(EMPTY_ARR, ['data', 'results'], feeData)
  const expensesList = pathOr<TExpenseItem[]>(EMPTY_ARR, ['data', 'results'], expenseData)

  const fixedFeeAmount = prop('fixedFeeAmount', details)

  const hourlyFeeCeiling = prop('hourlyFeeCeiling', details)

  const expenseInFee = prop('fixedFeeExpensesIncludedInFee', details)

  const budget = toNumber(fixedFeeAmount || hourlyFeeCeiling)
  const totalFee = sum(map(pipe(prop('amount'), Number), fees))
  const totalExpense = sum(map<{amount: string}, number>(pipe(prop('amount'), Number), expensesList))
  const totalAmount = expenseInFee ? totalFee + totalExpense : totalFee
  const amountPercent = totalAmount > budget ? HUND : totalAmount / budget * HUND

  const rates = pathOr<TRateItem[]>([], ['rates'], details)
  const position = find(item => equal(item.position.id, userPosition.id), rates)
  const rate: string = propOr(userPosition.rate, 'amountPerHour', position)
  return (
    <>
      <Wrapper>
        {Boolean(totalFee) && (
          <ProgressContainer>
            <Progress width={amountPercent} />
            <Percent>{numberFormat(amountPercent)}%</Percent>
          </ProgressContainer>
        )}
        <div>
          <AddFees onClick={onFeeCreate.onOpen}> + Fees</AddFees>
          <AddFees onClick={onExpenseCreate.onOpen}> + Expense</AddFees>
        </div>
      </Wrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCol span={6}>Performer</TableCol>
            <TableCol span={4}>Hours spend</TableCol>
            <TableCol span={4}>Cost</TableCol>
            <TableCol span={4}>Expenses</TableCol>
            <TableCol span={6}>Total(UZS)</TableCol>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workGroup.map(staff => {
            const filteredExpenses = filter((item) => equals(item.user.id, staff.id), expensesList)
            const filteredFees = filter((fee) => equals(fee.user.id, staff.id), fees)
            const expenseSum = pipe(
              map(path(['amount'])),
              sum
            )(filteredExpenses)


            const spentTime = filteredFees.reduce(
              (prev, curr) => addTime(prev, curr.spentTime),
              '00:00'
            )

            const amount = pipe(
              map(pipe(prop('amount'), toNumber)),
              sum
            )(filteredFees)


            return (
              <TableRow key={staff.id}>
                <TableCol span={6}>{staff.fullName}</TableCol>
                <TableCol span={4}>{spentTime}</TableCol>
                <TableCol span={4}>{numberFormat(amount)} USD</TableCol>
                <TableCol span={4}>{expenseSum} USD</TableCol>
                <TableCol span={6}>{numberFormat(amount + expenseSum)}</TableCol>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <RateContext.Provider value={toNumber(rate)}>
        <AssignmentFeeModal rate={rate} onFeeCreate={onFeeCreate} />
      </RateContext.Provider>

      <AssignmentExpenseModal onExpenseCreate={onExpenseCreate} />

    </>
  )
}

export default AssignmentFeeExpensesCreate
