import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const RouteWithSubRoutes = ({ routes, ...route }) => {
  return (
    <>
      <Route
        exact={true}
        path={route.path}
        render={props => (
          <route.component {...props} />
        )}
      />
      {routes.map((route, index) => (
        <RouteWithSubRoutes
          key={index}
          {...route}
        />
      ))}
    </>
  )
}

RouteWithSubRoutes.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  layout: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  component: PropTypes.any.isRequired,
  routes: PropTypes.array
}

RouteWithSubRoutes.defaultProps = {
  routes: []
}

export default RouteWithSubRoutes
