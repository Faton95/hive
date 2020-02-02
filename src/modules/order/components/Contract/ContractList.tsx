import { MENU_KEYS } from 'constants/menus'
import { CONTRACT_ITEM_URL, CONTRACT_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import { prop, map, pathOr, path } from 'ramda'
import { sprintf } from 'sprintf-js'
import { TUseDelete } from 'types'
import { TContractItem } from 'types/models'
import { Menu } from '../../../../components/Menu'
import Pagination from '../../../../components/Pagination'
import { TGetDataFromState, TData } from '../../../../types'
import numberFormat from '../../../../utils/numberFormat'
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
import ContractListFilterForm from './ContractListFilterForm'

type Props = {
    data: TGetDataFromState<TData<TContractItem>>;
    filterAction: any;
    onEdit: (id) => void;
    deleteData: TUseDelete;
}
const EMPTY = []
const ZERO = 0
const ContractList: FunctionComponent<Props> = props => {
  const { data, filterAction, onEdit, deleteData } = props

  const count = pathOr(ZERO, ['data', 'count'], data)
  const list: TContractItem[] = pathOr(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)

  const filterForm = (<ContractListFilterForm />)
  const actions = (
    <TableActions
      createPath={CONTRACT_CREATE_PATH}
      filterForm={filterForm}
      filterActions={filterAction}
    />
  )

  return (
    <div>
      <Menu title="Contracts" module={MENU_KEYS.CONTRACT} active={MENU_KEYS.CONTRACT} />
      <Box>
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={6}>Branch</TableCol>
              <TableCol span={6}>Client</TableCol>
              <TableCol span={5}>Deadline</TableCol>
              <TableCol span={5}>Payment Date</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: TContractItem) => {
              const id = prop('id', item)
              const branch = path(['branch', 'name'], item)
              const client = path(['client', 'name'], item)
              const deadline = dateFormat(path(['deadLine'], item))
              const paymentDate = path(['paymentDuration'], item)
              const link = sprintf(CONTRACT_ITEM_URL, id)

              return (
                <TableRowLink link={link} key={id} selectId={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={6}>{branch}</TableCol>
                  <TableCol span={6}>{client}</TableCol>
                  <TableCol span={5}>{deadline}</TableCol>
                  <TableCol span={5}>{paymentDate}</TableCol>
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

export default ContractList
