import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import styled from 'styled-components'
import { Row, Col } from '../UI'
import animation from './animation'
import { GREY, GREY_DARKER } from './colors'

const Container = styled('div')``

const Loader = styled('div')`
  animation: ${animation};
  background-color: ${GREY};
  border-radius: 8px;
  height: 20px;
  max-width: ${props => props.width};
  width: 100%;
`

const StyledHeader = styled('div')`
  background-color: #fbfbfd;
  & ${Loader} {
    background-color: ${GREY_DARKER};
  }
  border-radius: 8px;
`

const StyledRow = styled(Row)`
  align-items: center;
  border-top: ${props => props.theme.cube.border};
  height: ${props => (props.isBody ? '55px' : '50px')};
  padding: 0 10px;
`

const StyledCol = styled(Col)`
  flex-grow: unset;
`

const TableSkeleton = props => {
  const { count } = props
  const list = range(0, count)
  return (
    <Container {...props}>
      <StyledHeader>
        <StyledRow>
          <StyledCol span={24} />
        </StyledRow>
        <StyledRow gutter={30}>
          <StyledCol span={9}>
            <Loader width="160px" />
          </StyledCol>
          <StyledCol span={3}>
            <Loader width="40px" />
          </StyledCol>
          <StyledCol span={3}>
            <Loader width="80px" />
          </StyledCol>
          <StyledCol span={3}>
            <Loader width="75px" />
          </StyledCol>
          <StyledCol span={3}>
            <Loader width="70px" />
          </StyledCol>
          <StyledCol span={3}>
            <Loader width="65px" />
          </StyledCol>
        </StyledRow>
      </StyledHeader>
      {list.map(item => {
        return (
          <StyledRow key={item} gutter={30} isBody={true}>
            <StyledCol span={9}>
              <Loader width="215px" />
            </StyledCol>
            <StyledCol span={3}>
              <Loader width="75px" />
            </StyledCol>
            <StyledCol span={3}>
              <Loader width="120px" />
            </StyledCol>
            <StyledCol span={3}>
              <Loader width="85px" />
            </StyledCol>
            <StyledCol span={3}>
              <Loader width="70px" />
            </StyledCol>
            <StyledCol span={3}>
              <Loader width="90px" />
            </StyledCol>
          </StyledRow>
        )
      })}
    </Container>
  )
}

TableSkeleton.propTypes = {
  count: PropTypes.number
}

TableSkeleton.defaultProps = {
  count: 8
}

export default TableSkeleton
