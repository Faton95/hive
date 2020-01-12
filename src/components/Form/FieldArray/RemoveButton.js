import React from 'react'
import styled from 'styled-components'
import { Trash2 } from 'react-feather'
import TextAlign from '../../StyledElems/TextAlign'

const StyledDelete = styled(Trash2)`
  color: #9aa6ac;
  cursor: pointer;
`

const RemoveButton = ({ onRemove, ...props }) => (
  <TextAlign
    align="right"
    data-cy="remove-button"
    onClick={onRemove}
    {...props}
  >
    <StyledDelete />
  </TextAlign>
)

export default RemoveButton
