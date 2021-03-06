import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LogoutButton from "src/components/LogoutButton";
import TheHeaderDropdown from "src/frontend-containers/TheHeaderDropdown";
import LoginButton from "../components/LoginButton";
import AuthService from "../utils/AuthService";
import logo from "../assets/icons/logo.png";
const auth = new AuthService();

const requireAuth = () => {
    return auth.isAuthenticated() ? true : false;
  };

  const requireAdmin = () => {
    return requireAuth() && auth.isAdmin() ? true : false;
  };

const HeaderComponent = () => {
    const history = useHistory();

    return (
        <div>
            <Navbar fixed="top" expand="lg">
                <Navbar.Brand href="#home"><img src={logo} alt="logo" width="42px"/>Feed the Need</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        {requireAuth() && (
                        <Nav.Link href="#posts">Posts</Nav.Link>
                        )}
                  </Nav>
                    {requireAuth() ? <TheHeaderDropdown /> : <LoginButton />}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderComponent;