import React, { FunctionComponent, useState } from 'react'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'
import { TOnSubmit } from 'types'
import { FieldArray } from 'react-final-form-arrays'
import {
    Modal
} from 'components/UI'
import {
  FeesListField,
} from '../../../../../components/Form'

type Props = {
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

const AddFees = styled.div`
  float: right;
  color: #6770E6;
  cursor: pointer;
  font-weight: 500;
`
const AssignmentFeeModal: FunctionComponent<Props> = props => {
    const { onFeeCreate } = props
  return (
    <>
        <AddFees onClick={onFeeCreate.onOpen}> + Fees</AddFees>
        <Modal
            open={onFeeCreate.open}
            onClose={onFeeCreate.onClose}
            onOpen={onFeeCreate.onOpen}
        >
            <Form
            onSubmit={onFeeCreate.onSubmit}
            initialValues={{fees: [{}]}}
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
        </Modal>
    </>
  )
}

export default AssignmentFeeModal
