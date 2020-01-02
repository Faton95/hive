import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { CubeThemeProvider } from 'ui-cubic'
import theme from './etc/themes'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NormalizedStyles from './components/StyledElems/NormalizedStyles'
import GlobalStyles from './components/StyledElems/GlobalStyles'
import { TRoutes } from './types'

type Props = {
  routes: TRoutes;
  store: Store;
}
const App: FunctionComponent<Props> = ({ routes, store }) => {
  return (
    <Provider store={store}>
      <CubeThemeProvider theme={theme}>
        <React.Fragment>
          <NormalizedStyles />
          <GlobalStyles />
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
      </CubeThemeProvider>
    </Provider>

  )
}

export default App
