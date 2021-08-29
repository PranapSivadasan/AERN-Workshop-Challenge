import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Switch, Route, useHistory } from 'react-router-dom';
import BookComponent from './books/book-component';
import BookDetailsComponent from './books/book-details-component';
import BookListComponent from './books/book-list-component';
import DashboardComponent from './dashboard-component';

import FooterComponent from "./footer-component";
import HeaderComponent from "./header-component";
import LoginPage from './login/login-page';
import NavbarComponent from './navbar-component';

const AppComponent = () => {

    const history = useHistory();
    const [loginSuccess, updateLoginStatus] = useState(false);
    const [loggedInUser, updateLoginUser] = useState('Guest');
    const [userDetail, updateUserDetail] = useState(null);

    let render;
    const loginPage = <LoginPage changeLogin = {(val) => {
        updateLoginUser(val);
        // history.push('/dashboard');
        updateLoginStatus(true);
    }} />;
    const mainPage = <div className="page-grid">
        {/* <HeaderComponent></HeaderComponent> */}
        <NavbarComponent user={loggedInUser} userDetails={(val) => {updateUserDetail(val)}} logOut={(val) => updateLoginStatus(!val)}></NavbarComponent>
        <div className="container-fluid">
            {/* <Container> */}
            <Switch>
                <Route exact path='/dashboard'>
                    <DashboardComponent ></DashboardComponent>
                </Route>
                <Route exact path='/books'>
                    <BookComponent userDetail={userDetail}></BookComponent>
                    {/* <Row>
                    <Col>
                        <BookListComponent openDetails={(val) => {showBookDetails(val)}}></BookListComponent>
                    </Col>
                    <Col sm={8} style={{display: showDetails? '':'none'}}>
                        <BookDetailsComponent></BookDetailsComponent>
                    </Col>
                </Row> */}
                </Route>
                {/* <Route exact path='/books/:bookId'> */}
                {/* </Route> */}
                {/* <Route exact path='/'>
                    {logOut()}
                </Route> */}
            </Switch>
            {/* </Container> */}
        </div>
        <FooterComponent></FooterComponent>
    </div>;

    if (loginSuccess) {
        render = mainPage;
    } else {
        render = loginPage;
    }

    // function logOut() {
    //     if (loginSuccess) {
    //         updateLoginStatus(false);
    //     }
    // }

    return (    
        render
    );
}

export default AppComponent;