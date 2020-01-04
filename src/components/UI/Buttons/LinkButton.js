import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button, SecondaryButton } from './index'

const LinkButton = props => {
  const { to, ...rest } = props
  const history = useHistory()
  const onClick = ev => {
    ev.preventDefault()
    if (to) {
      return history.push(to)
    }
    return rest.onClick()
  }
  return <Button {...rest} onClick={onClick} />
}
LinkButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func
}
export default LinkButton

export const LinkSecondaryButton = props => {
  const { to, ...rest } = props
  const history = useHistory()

  const onClick = ev => {
    ev.preventDefault()

    if (to) {
      return history.push(to)
    }
    return rest.onClick()
  }
  return <SecondaryButton {...rest} onClick={onClick} />
}

LinkButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func
}
