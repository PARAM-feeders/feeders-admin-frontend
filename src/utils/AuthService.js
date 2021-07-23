import { EventEmitter } from "events";
import jwtDecode from "jwt-decode";
import { isTokenExpired } from "./jwtHelper";
import { useParams } from "react-router-dom";


export default class AuthService extends EventEmitter {
  constructor(props) {
    super(props);

    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(endpoint, values) {
    return this.fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
  }

  _doAuthenticationPut(endpoint, values) {
    return this.fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
  }

  getUserDetails() {
    return this.fetch(`${process.env.REACT_APP_API_URL}/auth`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.getToken()
      },
    })
  }

  login(email, password) {
    return this._doAuthentication("auth", { email, password });
  }

  forgotPassword(email) {
    return this._doAuthentication("auth/forgot", { email });
  }

 resetPassword(password, confirmPassword , resetToken) {
    return this._doAuthenticationPut("auth/password/reset/" + resetToken, { password, confirmPassword });
  }

  signup(name, email, password) {
    return this._doAuthentication("users", { name, email, password });
  }

  isAuthenticated() {
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem("token");
    if (token) {
      return !isTokenExpired(token);
    } else {
      return false;
    }
  }

  isAdmin() {
    // console.log(jwtDecode(this.getToken()).user.admin);
    return jwtDecode(this.getToken()).user.admin === true;
  }

  finishAuthentication(token) {
    localStorage.setItem("token", token);
    localStorage.setItem("id", jwtDecode(token).user.id);
    ;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("token");
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      return error;
    }
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.isAuthenticated()) {
      headers["x-auth-token"] = this.getToken();
    }

    return (fetch(url, {
      headers,
      ...options,
    }).then((response) => response.json())
    .catch(function (erro) {
      console.log(erro);
  }))


  }
}
