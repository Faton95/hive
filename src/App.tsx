import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { CubeThemeProvider } from 'ui-cubic'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './etc/themes'
import NormalizedStyles from './components/StyledElems/NormalizedStyles'
import GlobalStyles from './components/StyledElems/GlobalStyles'
import { TRoutes } from 'types'
import { getCookie } from 'utils/cookie'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'


type Props = {
  routes: TRoutes;
  store: Store;
}
const App: FunctionComponent<Props> = ({ routes, store }) => {
  const tokenExists = getCookie('token')

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CubeThemeProvider>
          <>
            <NormalizedStyles />
            <GlobalStyles />
            <BrowserRouter>
              {!tokenExists && <Redirect to="/login" />}
              {routes.map(({component: Component,layout: Layout, ...route}) => (
                <Route

                  key={route.path}
                  path={route.path}
                  {...route}
                  render={(renderProps) => Layout ? (
                    <Layout>
                    <Component {...renderProps}/>
                    </Layout>
                  ) : (
                    <Component {...renderProps}/>
                  )}

                />
              ))}
            </BrowserRouter>
          </>
        </CubeThemeProvider>
      </ThemeProvider>
    </Provider>

  )
}

export default App
