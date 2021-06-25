import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LogoutButton from "src/components/LogoutButton";
import LoginButton from "../components/LoginButton";



const HeaderComponent = () => {
    const history = useHistory();

    const { user, isAuthenticated, getAccessTokenSilently, isLoading } =
        useAuth0();


    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Feed the Need</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#posts">Posts</Nav.Link>
                        {isAuthenticated && (
                            <Nav.Link href="#profile">Profile</Nav.Link>
                        )}
                    </Nav>
                    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderComponent;