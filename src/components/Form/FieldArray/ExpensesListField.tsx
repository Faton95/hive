import React, { useState } from 'react'
import styled from 'styled-components'
import { path} from 'ramda'
import {
  Field,
  InputField,
  DateField,
  UniversalSearchField
} from '../index'

import { Button, Modal } from '../../UI'

import * as API from 'constants/api'
import FieldArrayHeader from './FieldArrayHeader'
import RemoveButton from './RemoveButton'

const InputBlock = styled.div`
  margin-bottom: 10px;
`
const InputDeleteBlock = styled.div`
  display: flex;
`
const DeleteBlock = styled.div`
  margin: 35px 0 0 20px;
`
const ButtonBLock = styled.div`
  text-align: right;
`
const Line = styled.div`
  border: 0.5px solid lightgrey;
  width: 100%;
  margin: 20px 0;
`
const ExpensesListField = props => {
  const { fields, ...p } = props

  const onAdd = () => fields.push({})
  const onRemove = index => fields.remove(index)
  const len = path(['length'], fields)

  return (
    <div>
      <FieldArrayHeader title="Expenses" onAdd={onAdd} />
      <InputBlock>
          <Field
            component={UniversalSearchField}
            api={API.POSITION_LIST}
            name={`${name}.cashier`}
            label="Cashier"
          />
      </InputBlock>
      {fields.map((name, index) => {
        return (
          <div key={index}>
            <InputBlock data-cy={`count-${index}`}>
              <Field
                name={`${name}.description`}
                component={InputField}
                placeholder="Description"
                label="Description"
              />
            </InputBlock>
            <InputBlock data-cy={`expenses-${index}`}>
              <Field
                name={`${name}.date`}
                component={DateField}
                placeholder="Date"
                label="Date"
              />
            </InputBlock>
            <InputDeleteBlock>
              <InputBlock data-cy={`expenses-${index}`}>
                <Field
                  name={`${name}.amount`}
                  component={InputField}
                  placeholder="Amount"
                  label="Amount"
                />
              </InputBlock>
              <DeleteBlock>
                <RemoveButton onRemove={() => onRemove(index)} />
              </DeleteBlock>
            </InputDeleteBlock>
            <Line />
          </div>
        )
      })}
      <ButtonBLock>
        {Boolean(len) && <Button type="submit">Save</Button>}
      </ButtonBLock>
    </div>
  )
}

export default ExpensesListField
