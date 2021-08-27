import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';

const NavbarComponent = () => {

    const toast = useRef(null);
    useEffect( () => {
        toast.current.show({severity:'success', summary: 'Login Success', life: 5000})
    }, [] );

    const history = useHistory();
    const [dashActive, dashClicked] = useState(checkDashActive());
    const [booksActive, booksClicked] = useState(checkBookActive());

    function navigate(route) {
        history.push(route);
        dashClicked(checkDashActive());
        booksClicked(checkBookActive());
    }

    function checkDashActive() {
        return String(history.location.pathname).includes('/dashboard');
    }

    function checkBookActive() {
        return String(history.location.pathname).includes('/books');
    }

    return (
        <div id="navigationBar" className='navigation-bar header'>
            <Toast ref={toast}/>
            <Navbar bg="light" expand="sm" variant="light">
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
                            onClick={() => { navigate('/dashboard');}}
                            className={dashActive ? "active" : ""}>
                            Dashboard</Nav.Link>
                        <Nav.Link
                            onClick={() => { navigate('/books');}}
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