import React from 'react'
import { path } from 'ramda'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Modal, Button, SecondaryButton } from '../UI'

import { ActionButtons } from '../StyledElems'
import { closeConfirmDialogAction } from './actions'

const getStateData = state => ({
  open: path(['confirmDialog', 'open'], state),
  title: path(['confirmDialog', 'title'], state),
  message: path(['confirmDialog', 'message'], state),
  onConfirm: path(['confirmDialog', 'onConfirm'], state),
  loading: path(['confirmDialog', 'loading'], state),
})

const ConfirmDialog = () => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeConfirmDialogAction())
  const { title, message, open, onConfirm, loading } = useSelector(getStateData, shallowEqual)
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      showCloseIcon={false}
      maskClosable={false}
    >
      <div>{message}</div>
      <ActionButtons>
        <SecondaryButton data-cy="confirmDialogCancel" onClick={onClose} disabled={loading}>Отмена</SecondaryButton>
        <Button data-cy="confirmDialogOk" onClick={onConfirm} loading={loading}>Подтвердить</Button>
      </ActionButtons>
    </Modal>
  )
}

export default ConfirmDialog
