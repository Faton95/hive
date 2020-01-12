import React, { FunctionComponent } from 'react'

import styled from 'styled-components'
import { Plus } from 'react-feather'

const Button = styled('div')`
  align-items: center;
  color: ${props => props.theme.colors.primary.default};
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  & svg {
    margin-right: 3px;
  }
`

type Props = {
  onClick: () => {};

}
const PlusButton: FunctionComponent<Props> = ({ children, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      <Plus size={20} />
      {children}
    </Button>
  )
}

export default PlusButton
