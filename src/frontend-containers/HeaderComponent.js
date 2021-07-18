import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LogoutButton from "src/components/LogoutButton";
import LoginButton from "../components/LoginButton";
import AuthService from "../utils/AuthService";
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
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Feed the Need</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        {requireAuth() && (
                        <Nav.Link href="#posts">Posts</Nav.Link>
                        )}
                        {requireAuth() && (
                            <Nav.Link href="#profile">Profile</Nav.Link>
                        )}
                        {requireAuth() && (
                            <Nav.Link href="#my-orders">Orders</Nav.Link>
                        )}
                    </Nav>
                    {requireAuth() ? <LogoutButton /> : <LoginButton />}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderComponent;