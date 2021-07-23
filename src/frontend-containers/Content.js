import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import AuthService from "../utils/AuthService";

// routes config
import routes from '../frontend-routes'


const auth = new AuthService();
const requireAuth = () => {
  return auth.isAuthenticated() ? true : false;
};

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Content = () => {
  return (
    <main className="c-main">
      {/* <CContainer fluid> */}
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, idx) => {
            return route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                  route.isAuth ? (requireAuth() ? (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  ) : (
                    <Redirect to="/login" />
                  )) : (<route.component {...props} />)

                )} />
            )
          })}
          <Redirect from="/home" to="/" />
        </Switch>
      </Suspense>
      {/* </CContainer>  */}
    </main>
  )
}

export default Content
