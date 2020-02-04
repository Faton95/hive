import React from "react";
import styled from 'styled-components'
import {pathOr, path, propOr, map} from 'ramda'
import { Field, InputField } from '../index'
import RemoveButton from './RemoveButton'
import { Table, TableRow, TableCol, TableHeader, TableBody, TableColRight as TableColUI } from '../../Table'
import FieldArrayHeader from './FieldArrayHeader'

const HeaderRow = styled(TableRow)`
  padding-left: 30px;
`

const TableColRight = styled(TableColUI)`
  align-self: center;
`

const ClientListField = props => {

  const { fields, ...p } = props
  const onAdd = () => fields.push({})
  const onRemove = index => fields.remove(index)

    const values: [] = propOr([], 'value', fields)
    
  return (
    <div>
      <FieldArrayHeader title={'Contacts'} onAdd={onAdd}/>
      <Table gutter={20} selection={false} list={values}>
        <TableHeader>
          <HeaderRow>
            <TableCol span={6}>Name</TableCol>
            <TableCol span={6}>Email</TableCol>
            <TableCol span={5}>Phone</TableCol>
            <TableCol span={6}>Position</TableCol>
            <TableCol span={1} />
          </HeaderRow>
        </TableHeader>
        <TableBody>
          {fields.map((name, index) => {
            return (
              <TableRow key={index}>
                <TableCol span={6} data-cy={`client-${index}`}>
                  <Field
                    name={`${name}name`}
                    component={InputField}
                    placeholder="Name"
                  />
                </TableCol>
                <TableCol span={6} data-cy={`count-${index}`}>
                  <Field
                    name={`${name}email`}
                    component={InputField}
                    placeholder="Email"
                  />
                </TableCol>
                <TableCol span={5} data-cy={`client-${index}`}>
                  <Field
                    name={`${name}phone`}
                    component={InputField}
                    placeholder="Phone"
                  />
                </TableCol>
                <TableCol span={6} data-cy={`client-${index}`}>
                  <Field
                    name={`${name}position`}
                    component={InputField}
                    placeholder="Position"
                  />
                </TableCol>
                <TableColRight span={1}>
                  <RemoveButton onRemove={() => onRemove(index)} />
                </TableColRight>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ClientListField
