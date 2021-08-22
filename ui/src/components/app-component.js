import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BookDetailsComponent from './book-details-component';
import BookListComponent from './book-list-component';
import DashboardComponent from './dashboard-component';

import FooterComponent from "./footer-component";
import HeaderComponent from "./header-component";
import NavbarComponent from './navbar-component';

const AppComponent = () => {
    return (
        <div>
            {/* <HeaderComponent></HeaderComponent> */}
            <NavbarComponent></NavbarComponent>
            <Switch>
                <Route exact path = '/'>
                    <DashboardComponent></DashboardComponent>
                </Route>
                <Route exact path = '/books'>
                    <BookListComponent></BookListComponent>
                </Route>
                <Route exact path = '/books/:bookId'>
                    <BookDetailsComponent></BookDetailsComponent>
                </Route>
            </Switch>
            <FooterComponent></FooterComponent>
        </div>
    );
}

export default AppComponent;