import { MENU_KEYS } from 'constants/menus'
import { ROLE_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { TUseDelete, TGetDataFromState, TData } from 'types'
import { TPositionItem, TGroupItem } from 'types/models'
import { Menu } from 'components/Menu'
import Pagination from 'components/Pagination'
import styled from 'styled-components'

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

const Tag = styled.span`
  display: inline-block;
  margin-right: 3px;
  margin-bottom: 3px;
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px 8px;
  background: #eff2f5;
`
type Props = {
  data: TGetDataFromState<TData<TPositionItem>>;
  onEdit: (id) => void;
  deleteData: TUseDelete;
}

const EMPTY = []
const ZERO = 0

const RoleList: FunctionComponent<Props> = props => {
  const { data, onEdit, deleteData } = props
  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TPositionItem[]>(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)

  const actions = (
    <TableActions
      createPath={ROLE_CREATE_PATH}
    />
  )

  return (
    <div>
      <Menu title="Positions" module={MENU_KEYS.SETTINGS} active={MENU_KEYS.SETTINGS} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={4}>Name</TableCol>
              <TableCol span={18}>Permissions</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: TPositionItem) => {
              const id = prop('id', item)
              const name = prop('name', item)
              const groups = pathOr<TGroupItem[]>([], ['groups'], item)

              const groupTags = map(group => <Tag key={group.id}>{group.name}</Tag>, groups)
              return (
                <TableRow key={id} selectId={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={4}>{name}</TableCol>
                  <TableCol span={18}>{groupTags}</TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => onEdit(id)}>
                        Изменить
                      </DropdownItem>
                      <DropdownItem onClick={() => deleteData.onSubmit(id)}>
                        Удалить
                      </DropdownItem>
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

export default RoleList
