import styled from 'styled-components'
import { BorderedButton } from 'ui-cubic'

export default styled(BorderedButton)`
  background-color: #fbfbfc;
  border-color: ${props => props.primary ? props.theme.cube.primaryColor : '#ced0dd'};
  border-radius: 6px;
  color: ${props => props.primary ? props.theme.cube.primaryColor : props.theme.cube.textColor};
  font-size: 14px;
  font-weight: normal;
  height: 36px;
  padding: 0 20px;
  &:hover {
    background-color: #f0f0f4;
    color: ${props => props.primary ? props.theme.cube.primaryColor : props.theme.cube.textColor};
  }
  &:focus {
    background-color: #fbfbfc;
    color: ${props => props.primary ? props.theme.cube.primaryColor : props.theme.cube.textColor};
  }
`
