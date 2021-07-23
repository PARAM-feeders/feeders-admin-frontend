import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/css/style.css";
import "./scss/style.scss";
import AuthService from "./utils/AuthService";

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
const Forgot = React.lazy(() => import("./views/pages/forgotPassword/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./views/pages/resetPassword/ResetPassword"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Home = React.lazy(() => import("./frontend-containers/Layout"));
const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/dashboard"
              name="Dashboard"
              render={(props) =>
                requireAdmin() ? (
                  <TheLayout {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/admin/users"
              name="Users"
              render={(props) =>
                requireAdmin() ? (
                  <TheLayout {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/admin/posts"
              name="Posts"
              render={(props) =>
                requireAdmin() ? (
                  <TheLayout {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/admin/orders"
              name="Orders"
              render={(props) =>
                requireAdmin() ? (
                  <TheLayout {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/theme/colors"
              name="Themes"
              render={(props) =>
                <TheLayout {...props} />
                // requireAdmin() ? (
                //   <TheLayout {...props} />
                // ) : (
                //   <Redirect to="/login" />
                // )
              }
            />

            <Route
              exact
              path="/notifications/toaster"
              name="Toaster"
              render={(props) =>
                <TheLayout {...props} />
                // requireAdmin() ? (
                //   <TheLayout {...props} />
                // ) : (
                //   <Redirect to="/login" />
                // )
              }
            />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login />}
            />
             <Route
              exact
              path="/forgot"
              name="Forgot Password Page"
              render={(props) => <Forgot />}
            />
            <Route
              exact
              path="/password/reset/:id"
              name="Forgot Password Page"
              render={(props) => <ResetPassword />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) =>
                <Home />
              }
            />
            {/* <Redirect to="/login" /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
// export default App;
