import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button'
const LoginButton = () => {
  const { loginWithPopup } = useAuth0();
  return <Button variant="secondary" onClick={() => loginWithPopup()}>Log In</Button>;
};

export default LoginButton;
