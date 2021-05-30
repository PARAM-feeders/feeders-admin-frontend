import React from 'react'
import { Nav, Navbar, } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AuthService from "../utils/AuthService";

const auth = new AuthService();

const HeaderComponent = () => {
    const history = useHistory();
    const logout = () => {
        auth.logout();
        history.push("/");
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Param Feeders</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        {auth.isAuthenticated() && (
                            <Nav.Link href="#profile">Profile</Nav.Link>
                        )}
                    </Nav>
                    {auth.isAuthenticated() ? (
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link href="#login">Login</Nav.Link>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderComponent;