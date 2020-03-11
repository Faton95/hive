import { MENU_KEYS } from 'constants/menus'
import { TAGS_CREATE_PATH, UNINVOICED_CREATE_URL } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr, filter, curry, equals, flatten, sum, pipe, reduced, reduce } from 'ramda'
import { TAssignmentItem, TClientItem, TExpenseItem, TFeeItem, TUseDelete, TGetDataFromState, TData } from 'types'
import styled from 'styled-components'
import addTimes from 'utils/addTime'
import numberFormat from 'utils/numberFormat'
import { Menu } from 'components/Menu'
import Pagination from 'components/Pagination'
import {
  Table,
  TableActions,
  TableRow,
  TableHeader,
  TableCol,
  TableBody
} from 'components/Table'
import { Box } from 'components/UI'
import { Row, Col } from 'components/UI/Grid'
import { LinkButton } from 'components/UI/Buttons'
import { sprintf } from 'sprintf-js'

const AssigmentRow = styled(Row)`
  padding: 10px 0 10px 20px;
  border-top: 1px #efefef solid;
`

const PaddingRow = styled(Row)`
  padding: 10px 0;
  font-weight: 500;
  align-items: center;
`

const LinkButtonSmall = styled(LinkButton)`
  border-radius: 6px;
  font-size: 14px;
  font-weight: normal;
  height: 36px;
  padding: 0 20px;
`
const ColRight = styled(Col)`
  text-align: right;
`
type Props = {
  clientData: TGetDataFromState<TData<TClientItem>>;
  assigmentData: TGetDataFromState<TData<TAssignmentItem>>;
/*
  feeData: TGetDataFromState<TData<TFeeItem>>;
  expenseData: TGetDataFromState<TData<TExpenseItem>>;
*/
  deleteData: TUseDelete;
}
const EMPTY = []
const ZERO = 0

const clientEquals = curry((id, item) => equals(id, item.client.id))

const UninvoicedList: FunctionComponent<Props> = props => {
  const {
    clientData,
    assigmentData
  } = props

  const count = pathOr(ZERO, ['data', 'count'], clientData)
  const list = pathOr<TClientItem[]>(EMPTY, ['data', 'results'], clientData)
  const assignmentList = pathOr<TAssignmentItem[]>(EMPTY, ['data', 'results'], assigmentData)

  const ids = map(prop('id'), list)
  const actions = (
    <TableActions
      createPath={TAGS_CREATE_PATH}
    />
  )

  return (
    <div>
      <Menu title='Uninvoiced' module={MENU_KEYS.BILLING} active={MENU_KEYS.BILLING} />
      <Box>
        <Table loading={clientData.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={9}>Name</TableCol>
              <TableCol span={4}>Uninvoiced hours</TableCol>
              <TableCol span={4}>Uninvoiced expenses</TableCol>
              <TableCol span={4}>uninvoiced amount</TableCol>
              <TableCol span={3} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => {
              const id = prop('id', item)
              const name = prop('name', item)
              const assignments = filter<TAssignmentItem>(clientEquals(id), assignmentList)
              const totalFeeAmount = assignments.reduce((prev, curr) => Number(curr.uninvoiceFeeAmount) + prev, 0)
              const totalExpenseAmount = assignments.reduce((prev, curr) => Number(curr.uninvoiceExpenseAmount) + prev, 0)
              const totalUninvoicedHours = assignments.reduce((prev, curr) => addTimes(prev, curr.uninvoiceFeeHours), '00:00')

              return (
                <TableRow key={id} align='center'>
                  <TableCol span={24}>
                    <PaddingRow gutter={30}>
                      <Col span={9}>{name}</Col>
                      <Col span={4}>{totalUninvoicedHours}</Col>
                      <Col span={4}>{totalExpenseAmount}</Col>
                      <Col span={4}>{numberFormat(totalFeeAmount + totalExpenseAmount)}</Col>
                      <ColRight span={3}>
                        <LinkButtonSmall to={sprintf(UNINVOICED_CREATE_URL, id)}>Invoice</LinkButtonSmall>
                      </ColRight>
                    </PaddingRow>
                    {assignments.map(assigment => (
                      <AssigmentRow key={assigment.id}>
                        <Col span={9}>{assigment.name}</Col>
                        <Col span={4}>{assigment.uninvoiceFeeHours}</Col>
                        <Col span={4}>{assigment.uninvoiceExpenseAmount}</Col>
                        <Col span={4}>{+assigment.uninvoiceFeeAmount + +assigment.uninvoiceExpenseAmount}</Col>
                        <Col span={3} />
                      </AssigmentRow>
                    ))}
                  </TableCol>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
      <Pagination count={count} />
    </div>
  )
}

export default UninvoicedList
