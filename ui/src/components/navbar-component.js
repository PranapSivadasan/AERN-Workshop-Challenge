import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useState, useRef, useEffect } from 'react';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

import * as API_CONST from '../constants/api-constants';
const NavbarComponent = ({ user, userDetails, logOut }) => {

    const toast = useRef(null);
    const [userDetail, updateUserDetail] = useState(null);

    useEffect(() => {
        async function init() {
            const endPoint = API_CONST.USER_DETAILS.replace('[user]', user);
            const userResponse = await (await fetch(endPoint)).json();
            updateUserDetail(userResponse);
            userDetails(userResponse);
            toast.current.show({ severity: 'success', summary: `Welcome ${userResponse?.name}`, life: 5000 })
        }
        init();
    }, [user]);
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
            <Toast ref={toast} />
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
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link
                            onClick={() => { navigate('/dashboard'); }}
                            className={dashActive ? "active" : ""}>
                            Dashboard</Nav.Link>
                        <Nav.Link
                            onClick={() => { navigate('/books'); }}
                            className={booksActive ? "active" : ""}>
                            Books
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    {userDetail?.name}
                    <Button icon="pi pi-sign-out"
                        title="Logout"
                        className="p-button-rounded p-button-text p-button-plain ml-2"
                        style={{ height: '20px', width: '30px' }}
                        onClick={() => { history.push('/'); logOut(true); }} />
                </Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        </div>
    );
}

export default NavbarComponent;