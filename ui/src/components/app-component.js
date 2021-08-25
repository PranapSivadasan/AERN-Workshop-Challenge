import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import BookComponent from './books/book-component';
import BookDetailsComponent from './books/book-details-component';
import BookListComponent from './books/book-list-component';
import DashboardComponent from './dashboard-component';

import FooterComponent from "./footer-component";
import HeaderComponent from "./header-component";
import NavbarComponent from './navbar-component';

const AppComponent = () => {


    return (
        <div className="page-grid">
            {/* <HeaderComponent></HeaderComponent> */}
            <NavbarComponent></NavbarComponent>
            <div className="container-fluid">
                {/* <Container> */}
                <Switch>
                    <Route exact path='/'>
                        <DashboardComponent></DashboardComponent>
                    </Route>
                    <Route exact path='/books'>
                        <BookComponent></BookComponent>
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
                </Switch>
                {/* </Container> */}
            </div>
            <FooterComponent></FooterComponent>
        </div>
    );
}

export default AppComponent;