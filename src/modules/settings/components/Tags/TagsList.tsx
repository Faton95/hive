import React, {FunctionComponent} from 'react'
import {MENU_KEYS} from 'constants/menus'
import {TAGS_ITEM_URL, TAGS_CREATE_PATH} from 'constants/routes'
import {prop, map, pathOr} from 'ramda'
import {sprintf} from 'sprintf-js'
import {TUseDelete, TGetDataFromState, TData} from 'types'
import {TOrderItem, TOrderList, TIdName} from 'types/models'
import {Menu} from 'components/Menu'
import Pagination from 'components/Pagination'
import numberFormat from 'utils/numberFormat'
import dateFormat from 'utils/dateFormat'

import {
  Table,
  TableActions,
  TableRow,
  TableRowLink,
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
  data: TGetDataFromState<TData<TIdName>>;
  filterAction: any;
  onEdit: (id) => void;
  deleteData: TUseDelete;
}

const EMPTY = []
const ZERO = 0


const TagsList: FunctionComponent<Props> = props => {

  const {data, filterAction, onEdit, deleteData} = props
  const count = pathOr(ZERO, ['data', 'count'], data)
  const list = pathOr<TIdName[]>(EMPTY, ['data', 'results'], data)
  const ids = map(prop('id'), list)

  const a = <div>dasd</div>

  const actions = (
    <TableActions
      createPath={TAGS_CREATE_PATH}
    />
  )


  return (
    <div>
      <Menu title="Теги" module={MENU_KEYS.SETTINGS} active={MENU_KEYS.SETTINGS}/>
      <Box>
        {a}
        <Table loading={data.loading} list={ids} actions={actions} gutter={30}>
          <TableHeader>
            <TableRow>
              <TableCol span={1}>#</TableCol>
              <TableCol span={22}>Таг</TableCol>
              <TableCol span={1}> </TableCol>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item: TIdName) => {
              const id = prop('id', item)
              const name = prop( 'name',item)

              return (
                <TableRow  key={id} selectId={id} align="center">
                  <TableCol span={1}>{id}</TableCol>
                  <TableCol span={22}>{name}</TableCol>
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
      <Pagination count={count}/>
    </div>
  );
}

export default TagsList;

