import { MENU_KEYS } from 'constants/menus'
import { GROUP_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { TUseDelete, TGetDataFromState, TData, TGroupItem } from 'types'
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
import {
  Box,
  Dropdown,
  DropdownItem
} from 'components/UI'

type Props = {
  data: TGetDataFromState<TData<TGroupItem>>;
  filterAction: any;
  onEdit: (id) => void;
  deleteData: TUseDelete;
}

const EMPTY = []
const ZERO = 0

const GroupList: FunctionComponent<Props> = props => {
  const { data, onEdit } = props
  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TGroupItem[]>(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)

  const actions = (
    <TableActions
      createPath={GROUP_CREATE_PATH}
    />
  )

  return (
    <div>
      <Menu title='Groups' module={MENU_KEYS.SETTINGS} active={MENU_KEYS.SETTINGS} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={4}>Name</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => {
              const id = prop('id', item)
              const name = prop('name', item)
              return (
                <TableRow key={id} selectId={id} align='center'>
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={4}>{name}</TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => onEdit(id)}>Update</DropdownItem>
                    </Dropdown>
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

export default GroupList
