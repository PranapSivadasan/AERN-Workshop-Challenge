import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import BookDetailsComponent from './book-details-component';
import BookListComponent from './book-list-component';
import { Divider } from 'primereact/divider';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ScrollTop } from 'primereact/scrolltop';

const BookComponent = ({userDetail}) => {

    const [showDetails, updateBookDetailsFlag] = useState(false);
    const [selectedBook, updateSelectedBook] = useState(null);
    const [refreshListPage, updateRefreshList] = useState(false);

    return (
        // <div className="container-fluid">

        <Row>
            <Col xs={12} md={showDetails ? 4 : 12}>
                <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 90px)' }} className="custombar1">

                    <BookListComponent
                        openDetails={(val) => { updateBookDetailsFlag(true); updateSelectedBook(val) }}
                        showDetails={showDetails}
                        refreshListPage={refreshListPage}
                        userDetail={userDetail}
                    ></BookListComponent>
                    <ScrollTop target="parent" threshold={100} className="custom-scrolltop" icon="pi pi-arrow-up" />

                </ScrollPanel>

            </Col>
            <Col xs={12} md={8} style={{ display: showDetails ? '' : 'none' }}>
                <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 90px)' }} className="custombar1">

                    <BookDetailsComponent
                        closeDetails={() => { updateBookDetailsFlag(false) }}
                        bookId={selectedBook}
                        userDetail={userDetail}
                        refreshList={(val) => {
                            if (val) {
                                updateRefreshList(!refreshListPage)
                            }
                        }}
                    ></BookDetailsComponent>
                    <ScrollTop target="parent" threshold={100} className="custom-scrolltop" icon="pi pi-arrow-up" />

                </ScrollPanel>

            </Col>
        </Row>
        // </div>
    );
}

export default BookComponent;