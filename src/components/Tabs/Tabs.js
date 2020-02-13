import React, { useState } from 'react'
import { pipe, path, prop, pathEq, find } from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled('div')``

const Container = styled('div')`
  display: inline-flex;
  position: relative;
  &:after {
    background-color: #ced0dd;
    border-radius: 6px;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
  }
`

const TabContent = styled('div')`
  padding: 36px 0;
`

const getCurrentTab = (tabs, activeTab) =>
  pipe(
    find(pathEq(['props', 'value'], activeTab)),
    path(['props', 'children'])
  )(tabs)

const Tabs = props => {
  const { children, initialValue, onChange } = props

  const [activeTab, setActiveTab] = useState(initialValue)
  const currActiveTab = getCurrentTab(children, activeTab)

  const onChangeTab = (event, val) => {
    setActiveTab(val)

    if (typeof onChange === 'function') {
      onChange(val)
    }
  }

  return (
    <Wrapper>
      <Container>
        {React.Children.map(children, (child, index) => {
          const defaultProps = prop('props', child)
          const tabValue = prop('value', defaultProps)
          const tabProps = {
            ...defaultProps,
            key: index,
            isActive: activeTab === tabValue,
            onClick: event => onChangeTab(event, tabValue)
          }

          return (
            child &&
            React.cloneElement(child, tabProps)
          )
        })}
      </Container>
      <TabContent>{currActiveTab}</TabContent>
    </Wrapper>
  )
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

Tabs.defaultProps = {
  value: null
}

export default Tabs
