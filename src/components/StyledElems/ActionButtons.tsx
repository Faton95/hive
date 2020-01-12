import styled, { css } from 'styled-components'

type Props = {
  marginTop?: string;
  mode?: 'half' | 'default';
}
const ActionButtons = styled.div<Props>`
  text-align:right;
  margin-top: ${props => props.marginTop};
  & > button {
    min-width: 180px;
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
  ${props => props.mode === 'half' && (
    css`
      display:flex;
      justify-content: space-between;
      & > button {
        margin-right: 0;
        min-width: unset;
        padding: 0 15px;
        width: calc(50% - 8px);
      }
    `
  )}
`

ActionButtons.defaultProps = {
  marginTop: '40px',
  mode: 'default'
}

export default ActionButtons
