import React from "react";
import styled from 'styled-components'
import {pathOr, path, propOr, map, replace, pipe, dropWhile, split, last} from 'ramda'
import { Field, InputField, DateField, TimeToSalaryField } from '../index'
import RemoveButton from './RemoveButton'
import { Table, TableRow, TableCol, TableHeader, TableBody, TableColRight as TableColUI } from '../../Table'
import FieldArrayHeader from './FieldArrayHeader'
import { Button } from '../../../components/UI'

const HeaderRow = styled(TableRow)`
  padding-left: 30px;
`

const TableColRight = styled(TableColUI)`
  align-self: center;
`

const FeesListField = props => {

  const { fields, ...p } = props
  
  const onAdd = () => fields.push({})
  const onRemove = index => fields.remove(index)
  const values: [] = propOr([], 'value', fields)
  
  return (
    <div>
      <FieldArrayHeader title={'Fees'} onAdd={onAdd}/>
      <form onSubmit={props.handleSubmit}>
        <Table gutter={20} selection={false} list={values}>
          <TableBody>
            {fields.map((name, index) => {
              return (
                <div key={index}>
                    <div data-cy={`fees-${index}`}>
                      <Field
                        name={`${name}description`}
                        component={InputField}
                        placeholder="Description"
                      />
                    </div>
                    <br/>
                    <div data-cy={`count-${index}`}>
                      <Field
                        name={`${name}date`}
                        component={DateField}
                        placeholder="Date"
                      />
                    </div>
                    <br/>
                    <TableRow>
                    <TableCol span={11} data-cy={`fees-${index}`}>
                      <Field
                        name={`${name}time`}
                        component={TimeToSalaryField}
                      />
                    </TableCol>
                    <TableColRight span={1}>
                      <RemoveButton onRemove={() => onRemove(index)} />
                    </TableColRight>
                  </TableRow>
                  <TableRow >
                    <Button type="submit">Save</Button>
                  </TableRow>
                </div>
              )
            })}
          </TableBody>
        </Table>
      </form>
    </div>
  )
}

export default FeesListField
