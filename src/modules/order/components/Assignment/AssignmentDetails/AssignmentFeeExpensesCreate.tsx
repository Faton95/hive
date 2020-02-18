import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'
import { TOnSubmit } from 'types'
import { FieldArray } from 'react-final-form-arrays'
import AssignmentFeeModal from './AssignmentFeeModal'
import AssignmentExpenseModal from './AssignmentExpenseModal'

type Props = {
  onExpenseCreate: {
    onSubmit: TOnSubmit,
    onClose: () => {};
    open: boolean,
    onOpen: () => {};
  };
  onFeeCreate: {
    onSubmit: TOnSubmit,
    onClose: () => {};
    open: boolean,
    onOpen: () => {};
  };
}

export const fields = [
  'fees',
  'expenses'
]
const FieldWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`
const FieldItem = styled.div`
  margin-left: 50px;
`

const AssignmentFeeExpensesCreate: FunctionComponent<Props> = props => {
  const { onFeeCreate, onExpenseCreate } = props
  return (
    <FieldWrapper>
      <FieldItem>
        <AssignmentFeeModal onFeeCreate={onFeeCreate} />
      </FieldItem>
      <FieldItem>
       <AssignmentExpenseModal onExpenseCreate={onExpenseCreate} />
      </FieldItem>
    </FieldWrapper>
  )
}

export default AssignmentFeeExpensesCreate
