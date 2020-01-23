import PropTypes from 'prop-types'
import styled from 'styled-components'
import FieldWrap from './FieldWrapper'

type Props = {
  alignItems?: string;
  justifyContent?: string;
}
const FlexFieldWrap = styled(FieldWrap)<Props>`
  align-items: ${props => props.alignItems};
  display: flex;
  & > div {
    width: calc(50% - 10px);
      :first-child:not(:last-child) {
        margin-right: 10px;
      }
      :last-child:not(:first-child) {
        margin-left: 10px;
      }
    }
  & ${FieldWrap} {
    margin-bottom: 0 !important;
  }
`

FlexFieldWrap.propTypes = {
  alignItems: PropTypes.string
}

FlexFieldWrap.defaultProps = {
  alignItems: 'flex-end'
}

export default FlexFieldWrap
