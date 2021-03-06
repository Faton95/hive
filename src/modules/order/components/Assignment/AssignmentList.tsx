import { MENU_KEYS } from 'constants/menus'
import { ASSIGNMENT_ITEM_URL, ASSIGNMENT_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { prop, map, pathOr, path } from 'ramda'
import { sprintf } from 'sprintf-js'
import { TUseDelete, TGetDataFromState, TData } from 'types'
import { TAssignmentItem } from 'types/models/assignment'
import { Menu } from 'components/Menu'
import Pagination from 'components/Pagination'
import { Tag } from 'components/StyledElems'
import {
  Table,
  TableActions,
  TableRow,
  TableRowLink,
  TableHeader,
  TableCol,
  TableBody
} from 'components/Table'
import { Box, Dropdown, DropdownItem } from 'components/UI'
import AssignmentListFilterForm from './AssignmentListFilterForm'
import { EMPTY_ARR, ZERO } from 'constants/usefulConstants'

const AssignmentName = styled.div`
  font-weight: 500;
  padding-bottom: 2px;
  color: #36434E;
`
type Props = {
    data: TGetDataFromState<TData<TAssignmentItem>>;
    filterAction: any;
    onEdit: (id) => void;
    deleteData: TUseDelete;
}

const AssignmentList: FunctionComponent<Props> = props => {
  const { data, filterAction, onEdit, deleteData } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TAssignmentItem[]>(EMPTY_ARR, ['data', 'results'], data)
  const ids = map(prop('id'), list)

  const filterForm = (<AssignmentListFilterForm />)
  const actions = (
    <TableActions
      createPath={ASSIGNMENT_CREATE_PATH}
      filterForm={filterForm}
      filterActions={filterAction}
    />
  )

  return (
    <div>
      <Menu title='Assignments' module={MENU_KEYS.ASSIGNMENT} active={MENU_KEYS.ASSIGNMENT} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={5}>Assignment</TableCol>
              <TableCol span={5}>Teem leader</TableCol>
              <TableCol span={4}>Status</TableCol>
              <TableCol span={4}>Billing Type</TableCol>
              <TableCol span={4}>Tags</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: TAssignmentItem) => {
              const id = prop('id', item)
              const name = prop('name', item)
              const client = path(['client', 'name'], item)
              const teamLeader = path(['teamLeader', 'fullName'], item)
              const billingType = prop('billingType', item)
              const status = path(['status'], item)
              const tags = pathOr(EMPTY_ARR, ['tags'], item)
              const link = sprintf(ASSIGNMENT_ITEM_URL, id)
              return (
                <TableRowLink link={link} key={id} align='center'>
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={5}>
                    <AssignmentName>{client}</AssignmentName>
                    {name}
                  </TableCol>
                  <TableCol span={5}>{teamLeader}</TableCol>
                  <TableCol span={4}>{status}</TableCol>
                  <TableCol span={4}>{billingType === 'fixed_fee' ? 'Fixed Fee' : 'Hourly billing'}</TableCol>
                  <TableCol span={4}>{tags.map(tag => (<Tag key={tag.id}>{tag.name}</Tag>))}</TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => onEdit(id)}>
                        Update
                      </DropdownItem>
                      <DropdownItem onClick={() => deleteData.onSubmit(id)}>
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  </TableCol>
                </TableRowLink>
              )
            })}
          </TableBody>
        </Table>
      </Box>
      <Pagination count={count} />
    </div>
  )
}

export default AssignmentList
