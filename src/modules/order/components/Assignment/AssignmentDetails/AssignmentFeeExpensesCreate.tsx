import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { TOnSubmit } from 'types'
import { FieldArray } from 'react-final-form-arrays'
import {
  DoubleField
} from 'components/StyledElems'
import {
  FeesListField,
  ExpensesListField
} from '../../../../../components/Form'

type Props = {
    onFeeCreate: TOnSubmit;
    onExpenseCreate: TOnSubmit;
}

export const fields = [
  'fees',
  'expenses'
]

const AssignmentFeeExpensesCreate: FunctionComponent<Props> = props => {
  return (
    <div>
      <DoubleField>
        <Form
          onSubmit={props.onFeeCreate}
          mutators={{
            ...arrayMutators
          }}
          render={formikProps => (
            <form onSubmit={formikProps.handleSubmit}>
              <FieldArray
                name="fees"
                component={FeesListField}
              />
            </form>
          )}
        />
        <Form
          onSubmit={props.onExpenseCreate}
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
      </DoubleField>
    </div>
  )
}

export default AssignmentFeeExpensesCreate
