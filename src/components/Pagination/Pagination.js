import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { lte, gte, gt, last as rLast } from 'ramda'
import { withRouter } from 'react-router-dom'
import { sprintf } from 'sprintf-js'
import ChevLeft from 'icons/ChevronLeft'
import ChevRight from 'icons/ChevronRight'
import { Box as BoxCUI } from 'ui-cubic'
import { getCurrentPage, getPageList, ONE, PAGE_SIZE } from './utils'
import { addParamsRoute } from '~/utils/route'

const Box = styled(BoxCUI)`
  align-items: center;
  display: flex;
  font-size: 15px;
  justify-content: flex-end;
  margin-top: 10px;
  padding: 12px 25px;
  text-align: right;
`

const Page = styled.span`
  align-items: center;
  color: #848e97;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  text-align: center;
  margin: 0 3px;
  font-weight: 500;
  transition: all 600ms;
  height: 28px;
  width: 28px;
  ${props =>
    props.isActive &&
    css`
      background-color: #f3f4f6;
      border-radius: 50%;
      color: ${props => props.theme.cube.textColorAlt};
    `}
`

const CurrentPages = styled.span`
  color: #a0a8af;
  font-weight: 500;
  margin-right: 60px;
`

const NavButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  margin-right: ${props => props.position === 'left' && '15px'};
  margin-left: ${props => props.position === 'right' && '15px'};
  height: 28px;
  width: 28px;
  & svg {
    color: ${props => (props.disabled ? '#8E9AAD' : '#4E546A')};
    font-size: 14px;
  }
`
const Pagination = props => {
  const { count, history, key } = props

  if (!count) {
    return null
  }

  const pages = getPageList(count)
  const currPage = getCurrentPage(key, history)
  const last = currPage * PAGE_SIZE

  const lastPage = rLast(pages)
  const pageCount = pages.length

  const to = gt(last, count) ? count : last
  const from = last - PAGE_SIZE + ONE
  const text = sprintf('%d-%d из %d', from, to, count)

  const prevDisabled = lte(currPage, ONE)
  const nextDisabled = gte(to, count)

  const onNext = () => addParamsRoute({ page: currPage + ONE }, history)

  const onPrev = () => addParamsRoute({ page: currPage - ONE }, history)

  const goTo = to => addParamsRoute({ page: to }, history)

  const pager =
    pageCount > 10 ? (
      <>
        <Page
          isActive={currPage === 1}
          onClick={() => goTo(1)}
        >
          1
        </Page>
        {currPage > 2 && '...'}
        {currPage !== 1 && currPage !== lastPage && (
          <Page isActive={true}>{currPage}</Page>
        )}
        {currPage < lastPage - 1 && '...'}
        <Page
          isActive={lastPage === currPage}
          onClick={() => goTo(lastPage)}
        >
          {lastPage}
        </Page>
      </>
    ) : (
      pages.map(item => (
        <Page
          key={item}
          isActive={item === currPage}
          onClick={() => goTo(item)}
        >
          {item}
        </Page>
      ))
    )

  return (
    <Box>
      <CurrentPages>{text}</CurrentPages>
      <NavButton position="left" disabled={prevDisabled} onClick={onPrev}>
        <ChevLeft />
      </NavButton>
      {pager}
      <NavButton position="right" disabled={nextDisabled} onClick={onNext}>
        <ChevRight />
      </NavButton>
    </Box>
  )
}

Pagination.propTypes = {
  count: PropTypes.number,
  history: PropTypes.object.isRequired,
  key: PropTypes.string
}

Pagination.defaultProps = {
  count: 0,
  key: 'page'
}

export default withRouter(Pagination)
