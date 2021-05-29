import React, { Component } from "react";
import AuthService from "./utils/AuthService";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "./scss/style.scss";

const auth = new AuthService();

// onEnter callback to validate authentication in private routes
const requireAuth = () => {
  return auth.isAuthenticated() ? true : false;
};

const requireAdmin = () => {
  return requireAuth() && auth.isAdmin() ? true : false;
};

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Home = React.lazy(() => import("./views/pages/home/Home"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              path="/dashboard"
              name="Dashboard"
              render={(props) =>
                requireAdmin() ? <TheLayout {...props} /> : <Redirect to="/" />
              }
            />
            <Route
              path="/home"
              name="Home"
              render={(props) =>
                requireAuth() ? <Home /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/"
              name="Login Page"
              render={(props) => <Login />}
            />
            <Route
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
// export default App;
