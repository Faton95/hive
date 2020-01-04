import styled, { css } from 'styled-components'
import { TableCol } from 'ui-cubic'

export default styled(TableCol)`
  text-align: right;
  ${({ isBody }) =>
    !isBody &&
    css`
      & > div {
        justify-content: flex-end;
        width: auto;
      }
    `}
`
