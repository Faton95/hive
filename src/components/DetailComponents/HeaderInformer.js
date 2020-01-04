import styled from 'styled-components'
import { DisplayFlex } from '../StyledElems'

const Header = styled(DisplayFlex)`
  padding-bottom: 27px;
  margin-bottom: 27px;
  border-bottom: ${props => props.theme.cube.border};
`

export default Header
