import { MENU_KEYS } from 'constants/menus'
import { CLIENT_ITEM_URL, CLIENT_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr } from 'ramda'
import { sprintf } from 'sprintf-js'
import { TUseDelete } from 'types'
import { TClientItem, TClientList } from 'types/models'
import { Menu } from '../../../components/Menu'
import Pagination from '../../../components/Pagination'
import { TGetDataFromState, TData } from '../../../types'
import numberFormat from '../../../utils/numberFormat'
import dateFormat from '../../../utils/dateFormat'
import {
  Table,
  TableActions,
  TableRow,
  TableRowLink,
  TableHeader,
  TableCol,
  TableBody
} from '../../../components/Table'
import { Box, Dropdown, DropdownItem } from '../../../components/UI'
import ClientListFilterForm from './ClientListFilterForm'

type Props = {
    data: TGetDataFromState<TData<TClientItem>>;
    filterAction: any;
    onEdit: (id) => void;
    deleteData: TUseDelete;
}
const EMPTY = []
const ZERO = 0
const ClientList: FunctionComponent<Props> = props => {
  const { data, filterAction, onEdit, deleteData } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TClientItem[]>(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)
  const filterForm = (<ClientListFilterForm />)
  const actions = (
    <TableActions
      createPath={CLIENT_CREATE_PATH}
      filterForm={filterForm}
      filterActions={filterAction}
    />
  )

  return (
    <div>
      <Menu title="Client" module={MENU_KEYS.CLIENT} active={MENU_KEYS.CLIENT} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={5}>Name</TableCol>
              <TableCol span={4}>Tags</TableCol>
              <TableCol span={5}>Address</TableCol>
              <TableCol span={5}>Created date</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: TClientItem) => {
              const id = prop('id', item)
              const createdDate = dateFormat(item.createdDate)
              const address = prop('address', item)
              const link = sprintf(CLIENT_ITEM_URL, id)
              const name = prop('name', item)

              return (
                <TableRowLink link={link} key={id} selectId={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={5}>{name}</TableCol>
                  <TableCol span={4}>{'tags'}</TableCol>
                  <TableCol span={5}>{address}</TableCol>
                  <TableCol span={5}>{createdDate}</TableCol>
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

export default ClientList