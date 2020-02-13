import React from 'react'
import styled from 'styled-components'
import { pathOr, path, propOr, map } from 'ramda'
import {
  Field,
  InputField,
  DateField,
  DurationField,
  UniversalStaticSelectField
} from '../index'
import { Table, TableRow, TableCol, TableHeader, TableBody, TableColRight as TableColUI } from '../../Table'
import { Button } from '../../UI'
import * as CONST from '../../../constants/backend'
import FieldArrayHeader from './FieldArrayHeader'
import RemoveButton from './RemoveButton'

const HeaderRow = styled(TableRow)`
  padding-left: 30px;
`

const TableColRight = styled(TableColUI)`
  align-self: center;
`

const ExpensesListField = props => {
  const { fields, ...p } = props
  const onAdd = () => fields.push({})
  const onRemove = index => fields.remove(index)

  const values: [] = propOr([], 'value', fields)

  return (
    <div>
      <FieldArrayHeader title="Expenses" onAdd={onAdd} />
      <Table gutter={20} selection={false} list={values}>
        <TableBody>
          {fields.map((name, index) => {
            return (
              <div key={index}>
                <div data-cy={`expenses-${index}`}>
                  <Field
                    component={UniversalStaticSelectField}
                    list={CONST.ORDER_STATUS_LIST}
                    name={`${name}cashier`}
                  />
                </div>
                <br />
                <div data-cy={`count-${index}`}>
                  <Field
                    name={`${name}description`}
                    component={InputField}
                    placeholder="Description"
                  />
                </div>
                <br />
                <TableRow>
                  <TableCol span={11} data-cy={`expenses-${index}`}>
                    <Field
                      name={`${name}date`}
                      component={DateField}
                      placeholder="Date"
                    />
                  </TableCol>
                  <TableCol span={12} data-cy={`expenses-${index}`}>
                    <Field
                      name={`${name}amount`}
                      component={InputField}
                      placeholder="Amount"
                    />
                  </TableCol>
                  <TableColRight span={1}>
                    <RemoveButton onRemove={() => onRemove(index)} />
                  </TableColRight>
                </TableRow>
                <TableRow>
                  <Button type="submit">Save</Button>
                </TableRow>
              </div>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ExpensesListField
