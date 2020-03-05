import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'
import { DetailMenu } from 'components/Menu'
import {
  DisplayFlex
} from 'components/StyledElems'
import {
  DetailDropdown
} from 'components/DetailComponents'
import { Box, DropdownItem } from 'components/UI'
import { TAssignmentItem, TExpenseItem } from 'types/models/assignment'
import { TFeeItem } from 'types/models/fee'
import { TGetDataFromState, TUseDelete, TData } from 'types'
import { TUseCreateModal } from 'types/hooks'
import { Tab, Tabs } from 'components/Tabs'
import AssignmentFeeExpenses from './AssignmentFeeExpensesCreate'
import AssignmentDetailsInfo from './AssignmentDetailsInfo'
const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`
const Tab1 = styled.div`
  display: flex;
  flex-direction: column;
`


type Props = {
  data: TGetDataFromState<TAssignmentItem>;
  deleteData: TUseDelete;
  onExpenseCreate: TUseCreateModal<TFeeItem>;
  onFeeCreate: TUseCreateModal<TFeeItem>;
  feeData: TGetDataFromState<TData<TFeeItem>>;
  expenseData: TGetDataFromState<TData<TExpenseItem>>;
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

  const details: TAssignmentItem = prop('data', data)
  const name = prop('name', details)
  const id = prop('id', details)

  return (
    <>
      <DetailMenu title="Assignment details" />
      <Box padding="25px">
        <Header alignItems="center" justifyContent="space-between">
          {name}
          <DetailDropdown marginLeft="50px">
            <DropdownItem onClick={() => deleteData.onSubmit(id)} toggleMenu={() => null}>Удалить</DropdownItem>
          </DetailDropdown>
        </Header>
        <Tabs initialValue="fees">
          <Tab label="Fees & expences" value="fees">
            <Tab1>
              <AssignmentFeeExpenses
                details={details}
                onFeeCreate={onFeeCreate}
                onExpenseCreate={onExpenseCreate}
                feeData={feeData}
                expenseData={expenseData}
              />
            </Tab1>
          </Tab>
          <Tab label="Assignment Details" value="assignment">
            <AssignmentDetailsInfo item={data} />
          </Tab>
        </Tabs>
      </Box>
    </>
  )
}

export default AssignmentDetail
