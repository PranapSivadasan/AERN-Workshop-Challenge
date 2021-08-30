import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import BookComponent from './books/book-component';
import DashboardComponent from './dashboard-component';

import FooterComponent from "./footer-component";
import LoginPage from './login/login-page';
import NavbarComponent from './navbar-component';

const AppComponent = () => {

    const [loginSuccess, updateLoginStatus] = useState(false);
    const [loggedInUser, updateLoginUser] = useState('Guest');
    const [userDetail, updateUserDetail] = useState(null);

    let render;
    const loginPage =
        <LoginPage changeLogin={(val) => {
            updateLoginUser(val);
            updateLoginStatus(true);
        }} />;
    const mainPage = <div className="page-grid">
        <NavbarComponent user={loggedInUser} userDetails={(val) => { updateUserDetail(val) }} logOut={(val) => updateLoginStatus(!val)}></NavbarComponent>
        <div className="container-fluid">
            <Switch>
                <Route exact path='/dashboard'>
                    <DashboardComponent ></DashboardComponent>
                </Route>
                <Route exact path='/books'>
                    <BookComponent userDetail={userDetail}></BookComponent>
                </Route>
            </Switch>
        </div>
        <FooterComponent></FooterComponent>
    </div>;

    if (loginSuccess) {
        render = mainPage;
    } else {
        render = loginPage;
    }

    return (
        render
    );
}

export default AppComponent;