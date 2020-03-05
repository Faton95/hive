import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { FieldRenderProps } from 'react-final-form'
import { path, propOr, map } from 'ramda'

import {
  Table,
  TableRow,
  TableCol,
  TableHeader,
  TableBody
} from 'components/Table'

import { TAssignmentItem } from 'types'

interface Props extends FieldRenderProps<Array<boolean>> {
  list: TAssignmentItem[];

}
const HeaderRow = styled(TableRow)`
  padding-left: 30px;
`

const UninvoicedAssignmentListField: FunctionComponent<Props> = props => {
  const { list, input } = props

  const ids = map(path<number>(['id']), list)
  const onChange = (selected: number[]) => input.onChange(selected)
  const tableActions = { onSelect: onChange, initialSelected: ids }
  return (
    <div>
      <Table gutter={20} list={ids} selection={true} tableActions={tableActions}>
        <TableHeader>
          <HeaderRow align="center">
            <TableCol span={11}>Assignment</TableCol>
            <TableCol span={6}>Uninvoiced Hours</TableCol>
            <TableCol span={6}>Uninvoiced Expenses</TableCol>
            <TableCol span={1} />
          </HeaderRow>
        </TableHeader>
        <TableBody>
          {list.map(assigment => {
            const hours = propOr('0', 'uninvoiceFeeAmount', assigment)
            const expenses = propOr('0', 'uninvoiceExpenseAmount', assigment)
            return (
              <TableRow key={assigment.id} selectId={assigment.id}>
                <TableCol span={11}>{assigment.name}</TableCol>
                <TableCol span={6}>{hours}</TableCol>
                <TableCol span={7}>{expenses}</TableCol>
              </TableRow>
            )
          })}

        </TableBody>
      </Table>
    </div>
  )
}

export default UninvoicedAssignmentListField
