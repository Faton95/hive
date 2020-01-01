import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NormalizedStyles from './components/StyledElems/NormalizedStyles'
import { TRoutes } from './types'
import themes from './etc/themes'

type Props = {
  routes: TRoutes;
  store: Store;
}
const App: FunctionComponent<Props> = ({ routes, store }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themes}>
        <React.Fragment>
          <NormalizedStyles />
          <BrowserRouter>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  {...route}
                />
              ))}
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      </ThemeProvider>
    </Provider>

  )
}

export default App
