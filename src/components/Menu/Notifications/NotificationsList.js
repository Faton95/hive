import React from 'react'
import PropTypes from 'prop-types'
import { length, prop, pipe, filter, propEq, isEmpty, not } from 'ramda'
import styled from 'styled-components'
import { Trash2 } from 'react-feather'
import EmptyState from './EmptyState'
import dateFormat from '~/utils/dateFormat'

const Container = styled('div')`
  background-color: white;
  border: ${props => props.theme.cube.border};
  border-radius: 8px;
  box-shadow: ${props => props.theme.cube.boxShadow};
  padding: 20px 22px 7px;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  max-height: 600px;
  overflow-y: auto;
  width: 380px;
  z-index: 100;
`

const Header = styled('div')`
  align-items: center;
  display:flex;
  justify-content: space-between;
  padding-bottom: 20px;
`

const TitleWrap = styled('div')`
  align-items: center;
  display:flex;
`

const Title = styled('div')`
  font-size: 15px;
  font-weight: 500;
`

const Count = styled('div')`
  background-color: ${props => props.theme.cube.colorOrange};
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  margin-left: 3px;
  padding: 3px 7px;
`

const ClearBtn = styled('div')`
  color: #9aa6ac;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
`

const List = styled('div')`
  
`

const Notify = styled('div')`
  border-top: ${props => props.theme.cube.border};
  cursor:pointer;
  display:flex;
  opacity: ${props => props.isRead ? '0.6' : '1'};
  padding: 14px 0;
  position: relative;
  transition: ${props => props.theme.cube.transition};
  z-index: 1;
  &:hover {
    &:after {
      background-color: #f5f6fd;
    }
  }
  &:after {
    background-color: transparent;
    border-radius: 8px;
    content: "";
    position: absolute;
    left: -10px;
    right: -10px;
    top: 0;
    bottom: 0;
    transition: inherit;
    z-index: -1;
  }
`

const IconWrap = styled('div')`
  background-color: #eeeefa;
  border-radius: 8px;
  height: 34px;
  margin-top: 3px;
  margin-right: 14px;
  min-width: 34px;
  width: 34px;
`

const ClickArea = styled('div')`
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const DeleteWrap = styled('div')`
  background-color: transparent;
  border-radius: 5px;
  cursor:pointer;
  padding: 3px;
  position: absolute; 
  top: 5px;
  right: 5px;
  transition: ${props => props.theme.cube.transition};
  opacity: 0;
  visibility: hidden;
  height: 26px;
  width: 26px;
  z-index: 2;
  &:hover {
    background-color: white;
    & > svg {
      color: ${props => props.theme.cube.colorRed};
    }
  }
  & > svg {
    color: ${props => props.theme.input.labelColor};
    display: block;
    transition: inherit;
  }
  ${Notify}:hover & {
    opacity: 1;
    visibility: visible;
  }
`

const Content = styled('div')`
  flex-grow: 1;
`

const Date = styled('div')`
  color: ${props => props.theme.input.labelColor};
  font-size: 13px;
  margin-bottom: 3px;
`

const Text = styled('div')`
  line-height: 20px;
  padding-right: 25px;
`

const NotificationsList = props => {
  const { data, hasNotifications, onReadNotify, onDelete, onClear } = props

  const count = pipe(
    filter(propEq('isRead', false)),
    length
  )(data)

  return (
    <Container>
      <Header>
        <TitleWrap>
          <Title>Уведомления</Title>
          {hasNotifications && (
            <Count>{count}</Count>
          )}
        </TitleWrap>
        {not(isEmpty(data)) && (
          <ClearBtn onClick={onClear}>очистить все</ClearBtn>
        )}
      </Header>

      {isEmpty(data)
        ? <EmptyState />
        : (
          <List>
            {data.map(item => {
              const id = prop('id', item)
              const isRead = prop('isRead', item)
              const data = prop('data', item)
              const message = prop('message', data)
              const createdAt = dateFormat(prop('createdAt', item), true)
              return (
                <Notify key={id} isRead={isRead}>
                  <IconWrap />

                  <ClickArea onClick={() => onReadNotify(id)} />

                  <DeleteWrap onClick={() => onDelete(id)}>
                    <Trash2 size={20} />
                  </DeleteWrap>

                  <Content>
                    <Date>{createdAt}</Date>
                    <Text>
                      {message}
                    </Text>
                  </Content>
                </Notify>
              )
            })}
          </List>
        )}
    </Container>
  )
}

NotificationsList.propTypes = {
  data: PropTypes.array.isRequired,
  hasNotifications: PropTypes.bool.isRequired,
  onReadNotify: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
}

export default NotificationsList
