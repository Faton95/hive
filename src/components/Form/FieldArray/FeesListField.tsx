import React from 'react'
import styled from 'styled-components'
import { path } from 'ramda'
import { Button } from 'components/UI'
import { Field, InputField, DateField, TimeToSalaryField } from '../index'
import RemoveButton from './RemoveButton'
import FieldArrayHeader from './FieldArrayHeader'

const FieldBlock = styled.div`
    margin-bottom: 10px;
`
const DeleteBlock = styled.div`
    display: flex;
    margin-bottom: 5px;
`
const RemoveBlock = styled.div`
    margin-top: 35px;
    margin-left: 10px;
`
const ButtonBLock = styled.div`
  text-align: right;
  margin-top: 20px;
`
const Line = styled.div`
  border: 0.5px solid lightgrey;
  width: 100%;
  margin: 20px 0;
`
const EMPTY_OBJ = {}
const FIRST_ITEM = 0
const FeesListField = props => {
  const { fields, ...p } = props
  const onAdd = () => fields.push(EMPTY_OBJ)
  const onRemove = index => fields.remove(index)
  const len = path(['length'], fields)

  return (
    <div>
      <FieldArrayHeader title="Fees" onAdd={onAdd} />
      {fields.map((name, index) => {
        return (
          <div key={index}>
            <FieldBlock data-cy={`fees-${index}`}>
              <Field
                name={`${name}.description`}
                component={InputField}
                label="Description"
                placeholder="Description"
              />
            </FieldBlock>
            <FieldBlock data-cy={`count-${index}`}>
              <Field
                name={`${name}.date`}
                component={DateField}
                label="Date"
              />
            </FieldBlock>
            <DeleteBlock>
              <div data-cy={`fees-${index}`}>
                <Field
                  name={`${name}.spentTime`}
                  component={TimeToSalaryField}
                />
              </div>
              {index !== FIRST_ITEM && (
                <RemoveBlock>
                  <RemoveButton onRemove={() => onRemove(index)} />
                </RemoveBlock>
              )}
            </DeleteBlock>
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

export default FeesListField
