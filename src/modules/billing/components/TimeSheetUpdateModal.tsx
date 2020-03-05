import React, { FunctionComponent } from 'react'
import { Form } from 'react-final-form'
import { TUseCustomModal, TUseCreate } from 'types/hooks'
import { Merge } from 'types'
import { Modal } from '../../../components/UI'
import TimeSheetCreateForm from './TimeSheetCreateForm'

type Props = {
  modal: Merge<TUseCustomModal, {initialValues: object}>;
  updateAction: TUseCreate;
};

export const fields = ['assignment', 'description']

const TimeSheetUpdateModal: FunctionComponent<Props> = props => {
  const {
    modal: { onClose, open, initialValues },
    updateAction: { onSubmit }
  } = props

  return (
    <Modal
      open={open}
      title="Create Time and Materials"
      onClose={onClose}
      showCloseIcon={true}
      maskClosable={false}
    >
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        component={TimeSheetCreateForm}
      />
    </Modal>
  )
}

export default TimeSheetUpdateModal
