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
import { Merge } from '../../../../../types/utils'
import AssignmentFeeExpenses from './AssignmentFeeExpensesCreate'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.border};
`
const MainInfo = styled.div`
  width: 400px;

`
const EMPTY_ARR = []

type onCreate = Merge<TGetDataFromState<any>, {onSubmit: TOnSubmit}>
type Props = {
  onSubmit: TOnSubmit;
  data: TGetDataFromState<TAssignmentItem>;
  deleteData: TUseDelete;
  onCreate: TUseCreate;
}

const AssignmentDetail: FunctionComponent<Props> = props => {
  const {
    data,
    deleteData,
    onSubmit,
    onCreate
  } = props

  const details = prop('data', data)
  const id = prop('id', details)

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
            <AssignmentFeeExpenses onSubmit={onSubmit} />
          </Tab>
          <Tab label="Assignment Details" value="assignment">
            <MainInfo>
              123
            </MainInfo>
          </Tab>
          <Tab label="Comments" value="comments">
            322
          </Tab>
        </Tabs>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCol span={6}>Наименование</TableCol>
                <TableCol span={6}>Цена</TableCol>
                <TableCol span={6}>Кол-во</TableCol>
                <TableCol span={6}>Сумма</TableCol>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow align="center">
                <TableCol span={6}>321</TableCol>
                <TableCol span={6}>3321</TableCol>
                <TableCol span={6}>123</TableCol>
                <TableCol span={6}>332211</TableCol>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Box>
    </>
  )
}

export default AssignmentDetail
