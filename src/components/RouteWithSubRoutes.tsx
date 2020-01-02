/*
import React, { FunctionComponent } from 'react'
import { Route } from 'react-router-dom'
import { TRoutes } from '../types'

type Props = {
  exact: boolean;
  path: string;
  component: FunctionComponent;
  routes: TRoutes;
}
const RouteWithSubRoutes: FunctionComponent<Props> = ({ routes, ...route }) => {
  return (
    <>
      <Route
        exact={true}
        path={route.path}
        render={props => (
          <route.component {...props} />
        )}
      />
      {/!*        {routes.map((childRoute, index) => (
            <RouteWithSubRoutes
                key={index}
                {...childRoute}
            />
        ))} *!/}
    </>
  )
}

RouteWithSubRoutes.defaultProps = {
  routes: []
}

export default RouteWithSubRoutes
*/
