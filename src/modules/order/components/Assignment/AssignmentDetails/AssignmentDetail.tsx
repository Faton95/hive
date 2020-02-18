import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { prop, path, concat, pathOr, map, groupBy, toPairs, pipe } from 'ramda'
import { DetailMenu } from 'components/Menu'
import {
  DisplayFlex
} from 'components/StyledElems'
import {
  DetailDropdown
} from 'components/DetailComponents'
import { Box, DropdownItem } from 'components/UI'
import {
  TableRow,
  Table,
  TableCol,
  TableBody,
  TableHeader
} from 'components/Table'
import { TAssignmentItem } from 'types/models/assignment'
import { TGetDataFromState, TUseDelete, TOnSubmit } from 'types'
import { TUseCreate } from 'types/hooks'
import { Tab, Tabs } from 'components/Tabs'
import AssignmentFeeExpenses from './AssignmentFeeExpensesCreate'
import AssignmentDetailsInfo from './AssignmentDetailsInfo'
import {Modal} from 'components/UI'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`
const MainInfo = styled.div`
  width: 400px;

`
const Tab1 = styled.div`
  display: flex;
  flex-direction: column;
`
const EMPTY_ARR = []

type Props = {
  data: TGetDataFromState<TAssignmentItem>;
  deleteData: TUseDelete;
  onExpenseCreate: {
    onSubmit: TOnSubmit,
    onClose: () => {};
    open: boolean,
    onOpen: () => {};
  };
  onFeeCreate: {
    onSubmit: TOnSubmit,
    onClose: () => {};
    open: boolean,
    onOpen: () => {};
  };
  feeData: TGetDataFromState<TAssignmentItem>;
  expenseData: TGetDataFromState<TAssignmentItem>;
}

const ConsumeTable = (arrItem) => {
  console.warn(arrItem)
  return (
    <TableRow align="center">
      <TableCol span={6}>332</TableCol>
      <TableCol span={6}>3321</TableCol>
      <TableCol span={6}>123</TableCol>
      <TableCol span={6}>332211</TableCol>
    </TableRow>
  )
}

const AssignmentDetail: FunctionComponent<Props> = props => {
  const {
    data,
    deleteData,
    onFeeCreate,
    feeData,
    onExpenseCreate,
    expenseData,
  } = props

  const [open, setOpen] = useState(true)
  const onClose = () => setOpen(!open)
  const fees = pathOr([], ['data', 'results'], feeData)
  const expenses = pathOr([], ['data', 'results'], expenseData)
  const feesExpencesData = concat(fees, expenses)
  const ids = map(prop('id'), feesExpencesData)

  const details = prop('data', data)
  const id = prop('id', details)

  const byId = groupBy(path(['user', 'id']), feesExpencesData)
  const sortedArr = toPairs(byId)

  pipe(
    toPairs,
    map(prop('0'))
  )(byId)


  return (
    <>
      <DetailMenu title={'Assignment details №' + id} />
      <Box padding="25px">
        <Header alignItems="center" justifyContent="flex-end">
          <DetailDropdown marginLeft="50px">
            <DropdownItem onClick={() => deleteData.onSubmit(id)} toggleMenu={() => null}>Удалить</DropdownItem>
          </DetailDropdown>
        </Header>
        <Tabs initialValue="fees">
          <Tab label="Fees & expences" value="fees">
            <Tab1>
            <AssignmentFeeExpenses
              onFeeCreate={onFeeCreate}
              onExpenseCreate={onExpenseCreate}
            />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCol span={6}>Performer</TableCol>
                    <TableCol span={6}>Hours spend</TableCol>
                    <TableCol span={6}>Expenses</TableCol>
                    <TableCol span={6}>Total(UZS)</TableCol>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedArr.map((item, key) => {
                    const arrItem = pathOr([], [1], item)
                    return (
                      <ConsumeTable arrItem={arrItem} />
                    )
                  })}
                </TableBody>
              </Table>
            </Tab1>
          </Tab>
          <Tab label="Assignment Details" value="assignment">
            <AssignmentDetailsInfo item={data} />
          </Tab>
          <Tab label="Comments" value="comments">
              <Modal
                open={open}
                title={'feed'}
                onClose={onClose}
              >
              123
            </Modal>
          </Tab>
        </Tabs>
      </Box>
    </>
  )
}

export default AssignmentDetail
