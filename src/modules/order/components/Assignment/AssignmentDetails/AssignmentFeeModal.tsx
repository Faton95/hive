import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import {
  Modal
} from 'components/UI'
import { TUseCreateModal } from 'types/hooks'
import { TFeeItem } from 'types'
import {
  FeesListField,
} from '../../../../../components/Form'
type Props = {
  onFeeCreate: TUseCreateModal<TFeeItem>;
  rate: string;
}

export const fields = [
  'fees',
  'expenses'
]

const AssignmentFeeModal: FunctionComponent<Props> = props => {
  const { onFeeCreate } = props
  return (
    <>
      <Modal
        open={onFeeCreate.open}
        onClose={onFeeCreate.onClose}
        onOpen={onFeeCreate.onOpen}
      >
        <Form
          onSubmit={onFeeCreate.onSubmit}
          initialValues={{ fees: [{}] }}
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
