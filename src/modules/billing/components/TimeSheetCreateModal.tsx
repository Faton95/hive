import React, { FunctionComponent } from 'react'
import {
  Form,
} from 'react-final-form'
import { TUseCreateModal } from 'types/hooks'
import { Modal } from '../../../components/UI'
import TimeSheetCreateForm from './TimeSheetCreateForm'

type Props = {
    createModal: TUseCreateModal<any>;
}

export const fields = [
  'assignment',
  'description'
]

const TimeSheetCreateModal: FunctionComponent<Props> = props => {
  const {
    createModal: { onClose, open, onSubmit }
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
        onSubmit={onSubmit}
        component={TimeSheetCreateForm}
      />
    </Modal>
  )
}

export default TimeSheetCreateModal
