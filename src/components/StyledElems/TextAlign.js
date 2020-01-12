import styled from 'styled-components'
import PropTypes from 'prop-types'

const TextAlign = styled('div')`
  text-align: ${props => props.align};
`

TextAlign.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit'])
}

TextAlign.defaultProps = {
  align: 'inherit'
}

export default TextAlign
