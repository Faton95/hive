import React from 'react'
import styled from 'styled-components'
import { PlusButton } from '../../UI/Buttons'

const Header = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
`

const Title = styled('div')`
  font-size: 18px;
  font-weight: 500;
`

const FieldArrayHeader = props => {
  const { title, onAdd, buttonText } = props
  return (
    <Header>
      <Title>{title}</Title>
      {onAdd && (
        <PlusButton data-cy='add-button' onClick={onAdd}>
          {buttonText}
        </PlusButton>
      )}
    </Header>
  )
}

FieldArrayHeader.defaultProps = {
  buttonText: 'Add'
}

export default FieldArrayHeader
