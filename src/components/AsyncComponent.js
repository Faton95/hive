import React from 'react'
import { MainBodySkeleton } from './Skeletons'

export function AsyncComponent (getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null
    state = { Component: AsyncComponent.Component }

    constructor (props) {
      super(props)
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }

    render () {
      const { Component } = this.state

      if (Component) {
        return <Component {...this.props} />
      }

      return <MainBodySkeleton />
    }
  }
}

export default AsyncComponent
