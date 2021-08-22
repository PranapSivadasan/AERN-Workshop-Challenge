import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useState } from 'react';

const NavbarComponent = () => {

    const history = useHistory();

    const [dashActive, dashClicked] = useState(true);
    const [booksActive, booksClicked] = useState(false);

    function navigate(route) {
        history.push(route);
    }

    return (
        <div className='navigation-bar'>
            <Navbar bg="light" expand="md" variant="light">
                <Navbar.Brand>
                    <img
                        alt=""
                        src="night-owl.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <strong>Night Owl</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link
                            onClick={() => { navigate('/'); dashClicked(true); booksClicked(false); }}
                            className={dashActive ? "active" : ""}>
                            Dashboard</Nav.Link>
                        <Nav.Link
                            onClick={() => { navigate('/books'); dashClicked(false); booksClicked(true); }}
                            className={booksActive ? "active" : ""}>
                            Books
                        </Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavbarComponent;