import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { TOnSubmit } from 'types'
import { FieldArray } from 'react-final-form-arrays'
import {
  FeesListField,
  ExpensesListField
} from '../../../../../components/Form'
import {
  DoubleField
} from 'components/StyledElems'

type Props = {
  onSubmit: TOnSubmit,
}

export const fields = [
  'fees',
  'cashier'
]

const AssignmentFeeExpensesCreate: FunctionComponent<Props> = props => {
  return (
    <div>
        <Form
          onSubmit={props.onSubmit}
          mutators={{
            ...arrayMutators
          }}
          render={formikProps => (
            <div>
              <DoubleField >
                <FieldArray
                  name="fees"
                  component={FeesListField}
                />
                <FieldArray
                  name="cashier"
                  component={ExpensesListField}
                />
              </DoubleField>
            </div>
          )}
        />
    </div>
  )
}

export default AssignmentFeeExpensesCreate
