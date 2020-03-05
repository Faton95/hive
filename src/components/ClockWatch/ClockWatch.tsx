import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getDuration } from 'utils/get'
import Clock from 'icons/Clock'
import ClockRunning from 'icons/ClockRunning'

export const Timer = styled.span<{started: boolean}>`
  display: flex;
  align-items: center;
  padding: 4px 7px;
  border-radius: 3px;
  background-color: ${props =>
    props.started ? props.theme.colors.primary.default : '#fff'};
  font-size: 15px;
  font-weight: 500;
  border: 1px solid;

  color: ${props => (props.started ? '#FFF' : props.theme.colors.text)}
  border-color: ${props =>
    props.started ? props.theme.colors.primary.default : props.theme.colors.text}
`

const Duration = styled.span`
  display: inline-block;
  min-width: 80px;
`
const ClockWatch = props => {
  const { totalDuration, status } = props
  const isPlay = status === 'play'
  const isPaused = status === 'paused'
  const [duration, setDuration] = useState(totalDuration)

  const t = useRef(0)
  useEffect(() => {
    setDuration(totalDuration)
  }, [totalDuration])

  useEffect(() => {
    if (isPlay) {
      t.current = setInterval(() => {
        setDuration(d => d + 1)
      }, 1000 * 60)
    }
    if (isPaused && t.current) {
      clearInterval(t.current)
    }

    return () => t.current && clearInterval(t.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlay])

  const time = getDuration(duration)

  return <Timer started={isPlay}><Duration>{time}</Duration> {isPlay ? <ClockRunning/> : <Clock />}</Timer>
}

ClockWatch.propTypes = {
  status: PropTypes.string,
  totalDuration: PropTypes.number
}
export default ClockWatch
