import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import avatar from './avatar.png'; // Beispielbild für den Avatar
import logo from './logo.png'; // Beispielbild für das Logo

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home" className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="logo"
                        style={{ width: '60px', height: '60px', marginRight: '10px' }}
                    />
                    <strong style={{ fontSize: '1.5rem' }}>DRESSME</strong> {/* Anpassung der Schriftgröße */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/my-measurements">
                            <Nav.Link>Measurements</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/my-model">
                            <Nav.Link>Model</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/model-viewer">
                            <Nav.Link>TryOn</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/my-data">
                            <Nav.Link>Closet</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <NavDropdown title={<img src={avatar} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
