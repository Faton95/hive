import React from 'react'
import {
  Button,
  BorderedButton,
  SecondaryButton as SecondaryButtonCUI,
  DangerButton as DangerButtonCUI
} from 'ui-cubic/dist/index.es'
import styled from 'styled-components'

export { default as BorderedButtonSmall } from './BorderedButtonSmall'
export { default as ButtonSmall } from './ButtonSmall'
export { default as LinkButton } from './LinkButton'

export const SecondaryButton = props => <SecondaryButtonCUI type={'button'} {...props} />
export const DangerButton = styled(DangerButtonCUI)``
export { Button, BorderedButton }
