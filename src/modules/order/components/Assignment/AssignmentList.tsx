import { MENU_KEYS } from 'constants/menus'
import { ASSIGNMENT_ITEM_URL, ASSIGNMENT_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { prop, map, pathOr, path } from 'ramda'
import { sprintf } from 'sprintf-js'
import { TUseDelete } from 'types'
import { TAssignmentItem } from 'types/models/assignment'
import { Menu } from '../../../../components/Menu'
import Pagination from '../../../../components/Pagination'
import { TGetDataFromState, TData } from '../../../../types'
import dateFormat from '../../../../utils/dateFormat'
import {
  Table,
  TableActions,
  TableRow,
  TableRowLink,
  TableHeader,
  TableCol,
  TableBody
} from '../../../../components/Table'
import { Box, Dropdown, DropdownItem } from '../../../../components/UI'
import AssignmentListFilterForm from './AssignmentListFilterForm'

const Tags = styled.span`
  padding: 5px 7px;
  border-radius: 12.5px;
  background-color: #f3f4f6;
  margin-right: 5px;
`
type Props = {
    data: TGetDataFromState<TData<TAssignmentItem>>;
    filterAction: any;
    onEdit: (id) => void;
    deleteData: TUseDelete;
}
const EMPTY = []
const ZERO = 0
const AssignmentList: FunctionComponent<Props> = props => {
  const { data, filterAction, onEdit, deleteData } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TAssignmentItem[]>(EMPTY, ['data', 'results'], data)
  console.warn(list)
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
      <Menu title="Assignments" module={MENU_KEYS.ASSIGNMENT} active={MENU_KEYS.ASSIGNMENT} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={4}>Name</TableCol>
              <TableCol span={3}>Client</TableCol>
              <TableCol span={4}>Teem leader</TableCol>
              <TableCol span={3}>Created Date</TableCol>
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
              const teamLeader = path(['teamLeader', 'username'], item)
              const createdDate = dateFormat(item.createdDate)
              const billingType = prop('billingType', item)
              const tags = pathOr(EMPTY, ['tags'], item)
              const link = sprintf(ASSIGNMENT_ITEM_URL, id)
              return (
                <TableRowLink link={link} key={id} selectId={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={4}>{name}</TableCol>
                  <TableCol span={3}>{client}</TableCol>
                  <TableCol span={4}>{teamLeader}</TableCol>
                  <TableCol span={3}>{createdDate}</TableCol>
                  <TableCol span={4}>{billingType}</TableCol>
                  <TableCol span={4}>{tags.map(tag => (<Tags>{tag.name}</Tags>))}</TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => onEdit(id)}>
                        Change
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
