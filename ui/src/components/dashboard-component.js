import React, { useEffect, useState } from 'react';

import { Row, Col, Spinner } from 'react-bootstrap';

import { Card } from 'primereact/card';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Rating } from 'primereact/rating';

import * as API_CONST from '../constants/api-constants';

import '../css/dashboard.css';

const DashboardComponent = () => {

    const [bookCountByCat, updateBookCountByCat] = useState([]);
    const [topRatedBook, updateTopRatedBook] = useState([]);
    const [bookCount, updateBookCount] = useState(0);
    const [userCount, updateUserCount] = useState(0);
    const [categoryCount, updateCategoryCount] = useState(0);
    const [loading, updateLoading] = useState(true);

    let renderObj;
    useEffect(() => {
        async function init() {
            updateLoading(true);
            const bookCountRes = await (await fetch(API_CONST.BOOK_COUNT_BY_CATEGORY)).json();
            updateBookCountByCat(bookCountRes);
            updateCategoryCount(bookCountRes.length);

            let query = API_CONST.BOOK_LIST;
            query = query.replace('[bookTitle]', '');
            query = query.replace('[categoryId]', '');
            query = query.replace('[authorName]', '');
            query = query.replace('[columnName]', 'ratings');
            query = query.replace('[sortOrder]', 'desc');
            const bookRes = await (await fetch(query)).json();
            let dataSet2 = [];
            for (let [index, tbook] of bookRes.entries()) {
                if (index === 10) {
                    break;
                }
                dataSet2.push(tbook);
            }
            updateBookCount(bookRes.length);
            updateTopRatedBook(dataSet2);
            const userCountRes = await (await fetch(API_CONST.USER_COUNT)).json();
            updateUserCount(userCountRes.totalUsers);
            updateLoading(false);
        }
        init();
    }, []);

    const footer = (val) => {
        return (
            <div style={{ fontSize: "1.5em", textAlign: 'center' }}>
                {val}
            </div>
        );
    }

    const dataCardHeader = (val) => {
        return (
            <div style={{ fontSize: "1.5em", textAlign: 'center' }} className="py-2">
                {val}
            </div>
        );
    }

    const ratingBody = (rowData) => {
        return (
            <Rating value={rowData?.ratings} stars={5} cancel={false} disabled />
        );
    }


    if (loading) {
        renderObj =
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
    } else {
        renderObj = <div className="mt-2" >
            <Row style={{ justifyContent: 'space-around' }}>
                <Col style={{ maxWidth: '300px' }}>
                    <Card className="mb-2" footer={footer('Total number of books')} style={{ backgroundColor: '#f3e2e3' }}>
                        <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                            <img src="books.png" height="50px"></img>
                            <span style={{ fontSize: "2rem" }}>{bookCount}</span>
                        </div>
                    </Card>
                </Col>
                <Col style={{ maxWidth: '300px' }}>
                    <Card footer={footer('Total number of categories')} className="mb-2" style={{ backgroundColor: '#e6f3e2' }}>
                        <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                            <img src="category.png" height="50px"></img>
                            <span style={{ fontSize: "2rem" }}>{categoryCount}</span>
                        </div>
                    </Card>
                </Col>
                <Col style={{ maxWidth: '300px' }}>
                    <Card footer={footer('Total number of users')} className="mb-2" style={{ backgroundColor: '#e4e2f3' }}>
                        <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                            <img src="user.png" height="50px"></img>
                            <span style={{ fontSize: "2rem" }}>{userCount}</span>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className="my-2">
                <Col>
                    <Card header={dataCardHeader('Number of books in each category')} className="dataTable" style={{ backgroundColor: '#ffe4d178' }}>
                        <DataTable value={bookCountByCat} className="p-datatable-sm data1" scrollable scrollHeight="35vh">
                            <Column field="name" header="Name"></Column>
                            <Column field="bookCount" header="Book Count"></Column>
                        </DataTable>
                    </Card>
                </Col>
                <Col> 
                    <Card header={dataCardHeader('Top 10 rated books')} className="dataTable" style={{ backgroundColor: '#f0f1c7b5' }}>
                        <DataTable value={topRatedBook} className="p-datatable-sm data2" scrollable scrollHeight="35vh">
                            <Column field="title" header="Book Name"></Column>
                            <Column field="ratings" header="Rating" body={ratingBody}></Column>
                        </DataTable>
                    </Card>
                </Col>
            </Row>
        </div>
    }

    return (
        renderObj
    );
}

export default DashboardComponent;