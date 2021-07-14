import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from "react-router-dom";
const LoginButton = () => {
  const history = useHistory();
  const Login = (event) => {
    history.push("/login")
  }
  return <Button variant="secondary" onClick={Login}>Log In</Button>;
};

export default LoginButton;
