import React, { useState, useEffect, useRef, useContext } from 'react'
import { filter, is, isEmpty, map, not, pipe, prop, propEq, path, length, has } from 'ramda'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import PubSub from 'pubsub-js'
import styled, { keyframes } from 'styled-components'
import { Bell } from 'react-feather'
import { notifyListAtion } from './actions'
import NotificationsList from './NotificationsList'
import { SOCKET_ON_MESSAGE } from '~/components/Notify/useSocket'
import NotifyContext from '~/components/Notify/NotifyContext'

const rotateDegree = '8deg'
const animationDuration = 500
const bellAnimate = keyframes`
  0% {
    transform: rotate(${rotateDegree});
  }
  25% {
    transform: rotate(-${rotateDegree});
  }
  50% {
    transform: rotate(${rotateDegree});
  }
  75% {
    transform: rotate(-${rotateDegree});
  }
  100% {
    transform: rotate(0);
  }
`

const Container = styled('div')`
  
`

const IconContainer = styled('div')`
  background-color: ${props => props.open ? '#f1f3f5' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  position: relative;
  transition: ${props => props.theme.cube.transition};
  height: 38px;
  width: 38px;
  & * {
    pointer-events: none;
  }
  & > svg {
    animation-duration: ${animationDuration}ms;
    color: #2c3a50;
    display: block;
    transform-origin: top center;
  }
  &.animate > svg {
    animation-name: ${bellAnimate};
  }
`

const Badge = styled('div')`
  background-color: ${props => props.theme.cube.colorOrange};
  border-radius: 50%;
  position: absolute;
  top: 4px;
  right: 10px;
  height: 8px;
  width: 8px;
`

const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const Notifications = props => {
  const notifyWrapRef = useRef()
  const notifyBellRef = useRef()
  const dispatch = useDispatch()
  const notifyData = useSelector(path(['notify', 'data']), shallowEqual)
  const notifyDataCount = length(notifyData)
  const [open, setOpen] = useState(false)
  const { sendMessage } = useContext(NotifyContext)

  const handleClick = event => {
    const isClickedOutside = notifyWrapRef.current && !notifyWrapRef.current.contains(event.target)
    if (open && isClickedOutside) {
      setOpen(false)
    }
  }

  useEffect(() => {
    const onMessage = (key, message) => {
      const data = prop('data', message)
      const results = prop('results', data)
      const isInitial = has('channelName', data)
      if (is(Array, results)) {
        if (isInitial) {
          dispatch(notifyListAtion(results))
        } else {
          const list = [...results, ...notifyData]
          dispatch(notifyListAtion(list))
        }
      }
    }
    PubSub.subscribe(SOCKET_ON_MESSAGE, onMessage)
    return () => {
      PubSub.unsubscribe(onMessage)
    }
  }, [notifyData, dispatch])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  const prevNotifyDataCount = usePrevious(notifyDataCount)
  useEffect(() => {
    if (prevNotifyDataCount < notifyDataCount) {
      const bell = notifyBellRef.current
      const toggleTimeout = setTimeout(() => {
        if (bell) bell.classList.remove('animate')
      }, animationDuration)
      if (bell) bell.classList.add('animate')
      return () => {
        clearTimeout(toggleTimeout)
      }
    }
  }, [notifyDataCount, prevNotifyDataCount])

  const toggleOpen = () => {
    setOpen(not(open))
  }

  const onReadNotify = id => {
    const getIsRead = item => propEq('id', id, item) ? true : item.isRead
    const makeRead = map(item => ({ ...item, isRead: getIsRead(item) }))
    dispatch(notifyListAtion(
      makeRead(notifyData)
    ))
    sendMessage({ action: 'read', ids: [id] })
  }

  const onDelete = id => {
    const formedData = filter(pipe(propEq('id', id), not))(notifyData)
    setTimeout(() => {
      sendMessage({ action: 'delete', ids: [id] })
      dispatch(notifyListAtion(formedData))
    }, 10)
  }

  const onClear = () => {
    setTimeout(() => {
      dispatch(notifyListAtion([]))
      sendMessage({ action: 'bulk_delete' })
    }, 10)
  }

  const hasNotifications = pipe(
    filter(propEq('isRead', false)),
    isEmpty,
    not
  )(notifyData)

  return (
    <Container>
      <IconContainer open={open} onClick={toggleOpen} ref={notifyBellRef}>
        {hasNotifications && (
          <Badge />
        )}
        <Bell size={22} />
      </IconContainer>

      <div ref={notifyWrapRef}>
        {open && (
          <NotificationsList
            data={notifyData}
            hasNotifications={hasNotifications}
            onReadNotify={onReadNotify}
            onDelete={onDelete}
            onClear={onClear}
          />
        )}
      </div>
    </Container>
  )
}

export default Notifications
