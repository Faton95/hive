import React from 'react'
import styled from 'styled-components'
import { Bell } from 'react-feather'

const Container = styled('div')`
  text-align: center;
  padding: 40px 40px 60px;
`

const IconWrap = styled('div')`
  margin: 0 auto 10px;
  position: relative;
  width: 40px;
  &:after {
    background-color: #959ca7;
    border: 3px solid white;
    border-radius: 50%;
    box-sizing: border-box;
    content: "";
    position: absolute;
    top: -4px;
    right: 2px;
    height: 15px;
    width: 15px;
  }
  & > svg {
    color: #cacdd3;
    display: block;
  }
`

const Text = styled('div')`
  color: ${props => props.theme.input.labelColor};
  font-size: 15px;
`

const EmptyState = () => {
  return (
    <Container>
      <IconWrap>
        <Bell size={40} />
      </IconWrap>
      <Text>Нет уведомлений</Text>
    </Container>
  )
}

export default EmptyState
