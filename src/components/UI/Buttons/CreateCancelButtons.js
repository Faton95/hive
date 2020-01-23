import React from 'react'
import PropTypes from 'prop-types'
import { LinkSecondaryButton } from './LinkButton'
import { Button } from './index'
import { ActionButtons } from '~/components/StyledElems'

const CreateCancelButtons = props => {
  const {
    loading,
    onCancel,
    cancelPath,
    submitText,
    marginTop,
    mode
  } = props

  return (
    <ActionButtons mode={mode} marginTop={marginTop}>
      <LinkSecondaryButton type="button" to={cancelPath} onClick={onCancel}>
        Cancel
      </LinkSecondaryButton>
      <Button type="submit" loading={loading}>{submitText}</Button>
    </ActionButtons>
  )
}

CreateCancelButtons.propTypes = {
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  cancelPath: PropTypes.string,
  submitText: PropTypes.string,
  marginTop: PropTypes.string,
  mode: PropTypes.oneOf([
    'default',
    'half'
  ])
}

CreateCancelButtons.defaultProps = {
  submitText: 'Сохранить'
}

export default CreateCancelButtons
