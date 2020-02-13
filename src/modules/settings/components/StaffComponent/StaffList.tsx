import { MENU_KEYS } from 'constants/menus'
import { STAFF_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr, path } from 'ramda'
import styled from 'styled-components'
import { TUseDelete } from 'types'
import { TStaffItem } from 'types/models/position'
import numberFormat from 'utils/numberFormat'
import manager from '../../../../icons/manager.svg'
import { Menu } from '../../../../components/Menu'
import Pagination from '../../../../components/Pagination'
import { TGetDataFromState, TData } from '../../../../types'
import {
  Table,
  TableActions,
  TableRow,
  TableHeader,
  TableCol,
  TableBody
} from '../../../../components/Table'
import { Box, Dropdown, DropdownItem } from '../../../../components/UI'

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  
`
type Props = {
    data: TGetDataFromState<TData<TStaffItem[]>>;
    onEdit: (id) => void;
    deleteData: TUseDelete;
}
const EMPTY = []
const ZERO = 0
const StaffList: FunctionComponent<Props> = props => {
  const { data, onEdit, deleteData } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TStaffItem[]>(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)
  const actions = (
    <TableActions
      createPath={STAFF_CREATE_PATH}
    />
  )

  return (
    <div>
      <Menu title="Currencies" module={MENU_KEYS.SETTINGS} active={MENU_KEYS.SETTINGS} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={2}>Image</TableCol>
              <TableCol span={5}>Username</TableCol>
              <TableCol span={5}>Fullname</TableCol>
              <TableCol span={5}>Position</TableCol>
              <TableCol span={5}>Rate</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => {
              const id = prop('id', item)
              const username = prop('username', item)
              const fullname = prop('fullName', item)
              const position = path(['position', 'name'], item)
              const rate = numberFormat(prop('rate', item))
              const image = path(['photo', 'file'], item)
              return (
                <TableRow key={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={2}>
                    <Img src={typeof (image) === 'undefined' ? manager : image} alt="image" />
                  </TableCol>
                  <TableCol span={5}>{username}</TableCol>
                  <TableCol span={5}>{fullname}</TableCol>
                  <TableCol span={5}>{position}</TableCol>
                  <TableCol span={5}>{rate}</TableCol>
                  <TableCol span={1}>
                    <Dropdown>
                      <DropdownItem onClick={() => onEdit(id)}>
                        Edit
                      </DropdownItem>
                      <DropdownItem onClick={() => deleteData.onSubmit(id)}>
                        Delete
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

export default StaffList
