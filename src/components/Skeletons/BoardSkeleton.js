import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import styled from 'styled-components'
import animation from './animation'
import { GREY, GREY_DARKER } from './colors'

const Container = styled('div')`
  display: flex;
  margin-top: 40px;
`

const Board = styled('div')`
  margin-right: 25px;
`

const Title = styled('div')`
  animation: ${animation};
  background-color: ${GREY_DARKER};
  border-radius: 4px;
  height: 20px;
  margin-bottom: 20px;
  width: 67%;
`

const Card = styled('div')`
  animation: ${animation};
  background-color: ${GREY};
  border-radius: 8px;
  height: 185px;
  margin-bottom: 15px;
  min-width: 285px;
  width: 285px;
`

const getRandomNumber = (min, max) => {
  const minNum = Math.ceil(min)
  const maxNum = Math.floor(max)
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

const BoardSkeleton = props => {
  const { boardCount, cardCount } = props

  const boardList = range(0, boardCount)

  return (
    <Container>
      {boardList.map(board => {
        const cardRandomCount = getRandomNumber(1, cardCount)
        const cardList = range(0, cardRandomCount)
        return (
          <Board key={board}>
            <Title />
            {cardList.map(card => {
              return (
                <Card key={card} />
              )
            })}
          </Board>
        )
      })}
    </Container>
  )
}

BoardSkeleton.propTypes = {
  boardCount: PropTypes.number,
  cardCount: PropTypes.number
}

BoardSkeleton.defaultProps = {
  boardCount: 5,
  cardCount: 3
}

export default BoardSkeleton
