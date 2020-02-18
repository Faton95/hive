import React, { FunctionComponent, useState } from 'react'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'
import { TOnSubmit, TSubscriptionItem } from 'types'
import { FieldArray } from 'react-final-form-arrays'
import {
    Modal
} from 'components/UI'
import {
    ExpensesListField,
} from '../../../../../components/Form'

type Props = {
    onExpenseCreate: {
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

const AddFees = styled.div`
  float: right;
  color: #6770E6;
  cursor: pointer;
  font-weight: 500;
`
const AssignmentExpenseModal: FunctionComponent<Props> = props => {
    const { onExpenseCreate } = props
    return (
        <>
            <AddFees onClick={onExpenseCreate.onOpen}> + Expense</AddFees>
            <Modal
                open={onExpenseCreate.open}
                onClose={onExpenseCreate.onClose}
                onOpen={onExpenseCreate.onOpen}
            >
                <Form
                    onSubmit={onExpenseCreate.onSubmit}
                    initialValues={{expenses: [{}]}}
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
