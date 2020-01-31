import { MENU_KEYS } from 'constants/menus'
import { BANK_ACCOUNT_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { TUseDelete } from 'types'
import { TBankAddressItem, TBankAddressList } from 'types/models'
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

type Props = {
    data: TGetDataFromState<TData<TBankAddressList>>;
    onEdit: (id) => void;
    deleteData: TUseDelete;
}
const EMPTY = []
const ZERO = 0
const BankAccountList: FunctionComponent<Props> = props => {
  const { data, onEdit, deleteData } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TBankAddressItem[]>(EMPTY, ['data', 'results'], data)
  console.warn(list)
  const ids = map(prop('id'), list)
  const actions = (
    <TableActions
      createPath={BANK_ACCOUNT_CREATE_PATH}
    />
  )

  return (
    <div>
      <Menu title="Bank Account" module={MENU_KEYS.SETTINGS} active={MENU_KEYS.SETTINGS} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={5}>Name</TableCol>
              <TableCol span={5}>Code</TableCol>
              <TableCol span={5}>address</TableCol>
              <TableCol span={7}>Bank detail</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => {
              const id = prop('id', item)
              const name = prop('name', item)
              const code = prop('code', item)
              const address = prop('address', item)
              const bankDetails = prop('bankDetails', item)
              return (
                <TableRow key={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={5}>{name}</TableCol>
                  <TableCol span={5}>{code}</TableCol>
                  <TableCol span={5}>{address}</TableCol>
                  <TableCol span={7}>{bankDetails}</TableCol>
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

export default BankAccountList
