import React from 'react'
import styled from 'styled-components'
import { pathOr, path, propOr, map, replace, pipe, dropWhile, split, last } from 'ramda'
import { Field, InputField, DateField, TimeToSalaryField } from '../index'
import { Table, TableRow, TableCol, TableHeader, TableBody, TableColRight as TableColUI } from '../../Table'
import { Button } from '../../../components/UI'
import RemoveButton from './RemoveButton'
import FieldArrayHeader from './FieldArrayHeader'

const HeaderRow = styled(TableRow)`
  padding-left: 30px;
`

const TableColRight = styled(TableColUI)`
  align-self: center;
`
const EMPTY_ARR = []
const EMPTY_OBJ = {}
const FeesListField = props => {
  const { fields, ...p } = props
  const onAdd = () => fields.push(EMPTY_OBJ)
  const onRemove = index => fields.remove(index)
  const values: [] = propOr(EMPTY_ARR, 'value', fields)

  return (
    <div>
      <FieldArrayHeader title="Fees" onAdd={onAdd} />

      <Table gutter={20} selection={false} list={values}>
        <TableBody>
          {fields.map((name, index) => {
            return (
              <div key={index}>
                <div data-cy={`fees-${index}`}>
                  <Field
                    name={`${name}.description`}
                    component={InputField}
                    placeholder="Description"
                  />
                </div>
                <br />
                <div data-cy={`count-${index}`}>
                  <Field
                    name={`${name}.date`}
                    component={DateField}
                    placeholder="Date"
                  />
                </div>
                <br />
                <TableRow>
                  <TableCol span={11} data-cy={`fees-${index}`}>
                    <Field
                      name={`${name}.spent_time`}
                      component={TimeToSalaryField}
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

export default FeesListField
