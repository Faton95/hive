import React from 'react'
import styled from 'styled-components'

type Props = {
  alignItems?: string;
  justifyContent?: string;
}
const DisplayFlex = styled.div<Props>`
  display: flex;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
`

export default DisplayFlex
