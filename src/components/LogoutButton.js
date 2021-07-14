import Button from 'react-bootstrap/Button';
import AuthService from "../utils/AuthService";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";


const LogoutButton = () => {
const history = useHistory();
  const auth = new AuthService();

  const Logout = (event) => {
    auth.logout();
    history.push("/home");
  }
  return (
    <Button variant="secondary" onClick={Logout}>Log Out</Button>
  );
};

export default LogoutButton;
