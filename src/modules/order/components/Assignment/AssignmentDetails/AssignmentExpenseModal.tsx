import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import {
  Modal
} from 'components/UI'
import { TUseCreateModal } from 'types/hooks'
import {
  ExpensesListField,
} from 'components/Form'

type Props = {
    onExpenseCreate: TUseCreateModal<any>;
}

export const fields = [
  'fees',
  'expenses'
]

const AssignmentExpenseModal: FunctionComponent<Props> = props => {
  const { onExpenseCreate } = props
  return (
    <>
      <Modal
        open={onExpenseCreate.open}
        onClose={onExpenseCreate.onClose}
        onOpen={onExpenseCreate.onOpen}
      >
        <Form
          onSubmit={onExpenseCreate.onSubmit}
          initialValues={{ expenses: [{}] }}
          mutators={{
            ...arrayMutators
          }}
          render={formikProps => (
            <form onSubmit={formikProps.handleSubmit}>
              <FieldArray
                name="expenses"
                component={ExpensesListField}
              />
            </form>
          )}
        />
      </Modal>
    </>
  )
}

export default AssignmentExpenseModal
