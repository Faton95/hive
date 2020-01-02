import styled from 'styled-components'
import { Box } from '../UI'

//export { Notifications } from './Notifications'
// export { UserInfo } from './UserInfo'

export const NavBar = styled(Box)`
  align-items: center;
  color: ${props => props.theme.cube.textColor};
  display: flex;
  justify-content: space-between;
  height: 68px;
  margin-bottom: 20px;
  position: relative;
`

export const IconWrapper = styled('div')`
  & > svg {
    cursor: pointer;
    display: block;
  }
`

export const Title = styled('span')`
  font-size: 18px;
  line-height: 26px;
  color: #2c3a50;
  font-weight: 500;
  margin-left: 20px;
`
