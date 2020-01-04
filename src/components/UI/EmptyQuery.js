import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Clipboard from '../../icons/Clipboard'

const Empty = styled.div`
  text-align: center;
  padding: ${props => props.padding};
`

const NoData = styled.div`
  font-size: 15px;
  color: #36434e;
  font-weight: 500;
  margin: 8px 0;
`

const PromptText = styled.div`
  color: ${props => props.theme.input.labelColor};
`

const EmptyQuery = props => {
  const { promptText, padding } = props

  return (
    <Empty padding={padding} {...props}>
      <Clipboard />
      <NoData>Нет данных</NoData>
      <PromptText>{promptText}</PromptText>
    </Empty>
  )
}

EmptyQuery.propTypes = {
  promptText: PropTypes.string,
  padding: PropTypes.string,
}

EmptyQuery.defaultProps = {
  padding: '100px'
}

export default EmptyQuery
