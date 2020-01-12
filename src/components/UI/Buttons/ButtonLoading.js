import React from 'react'
import { Button } from 'ui-cubic/dist/index.es'
import Loader from '../../../icons/Loader'

const ButtonLoading = props => {
  const { loading, ...rest } = props
  return (
    <Button {...rest} />
  )
}
