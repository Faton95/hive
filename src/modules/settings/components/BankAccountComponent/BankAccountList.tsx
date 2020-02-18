import { MENU_KEYS } from 'constants/menus'
import { BANK_ACCOUNT_CREATE_PATH } from 'constants/routes'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
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

const CardBlock = styled.div`
display: grid;
grid-column-gap: 50px;
grid-template-columns: auto auto auto;
`
const Card = styled(Box)`
  width: 100%;
  height: 400px;
  padding: 20px;
  margin-top: 20px;
`
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CardTitle = styled.div`
  color: #8F9BB0;
  margin-top: 20px;
  font-size: 13pt;
`
const CardContent = styled.div`
  margin-top: 5px;
  line-height: 1.5
`
const BankDetails = styled.pre`
  white-space: pre-wrap;
  line-height: 1.5
`
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
        </Table>
      </Box>
      <CardBlock>
      {list.map((item) => {
              const id = prop('id', item)
              const name = prop('name', item)
              const code = prop('code', item)
              const address = prop('address', item)
              const bankDetails = prop('bankDetails', item)
              console.warn(item)
              return (
                <Card key={id}>
                  <CardHeader>
                    <div>
                      {name}
                    </div>
                    <div>
                      ({code})
                    </div>
                    <div>
                      <Dropdown>
                        <DropdownItem onClick={() => onEdit(id)}>
                          Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => deleteData.onSubmit(id)}>
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </CardHeader>
                  <CardTitle>
                      Address
                  </CardTitle>
                  <CardContent>
                    {address}
                  </CardContent>
                  <CardTitle>
                      Bank Details
                  </CardTitle>
                  <CardContent>
                    <BankDetails>
                      {bankDetails}
                    </BankDetails>
                  </CardContent>
                </Card>
              )
            })}
        </CardBlock>
      <Pagination count={count} />
    </div>
  )
}

export default BankAccountList
