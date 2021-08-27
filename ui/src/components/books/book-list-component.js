import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';

import * as API_CONST from '../../constants/api-constants';

const BookListComponent = ({openDetails}) => {

    const [bookListArray, updateBookListArray] = useState([]);
    const [loading, bookListLoading] = useState(true);

    useEffect(() => {

        async function init() {
            bookListLoading(true);
            let query = API_CONST.BOOK_LIST;
            query = query.replace('[bookTitle]', '');
            query = query.replace('[categoryId]', '');
            query = query.replace('[authorName]', '');
            query = query.replace('[columnName]', 'createdtime');
            query = query.replace('[sortOrder]', 'desc');
            // console.log(query);
            const bookListResponse = await (await fetch(query)).json();
            updateBookListArray(bookListResponse);
            bookListLoading(false);
        }

        init();

    }, []);

    return (
        <div id="bookListComponent">
            <div id="loading" style={{ display: !loading ? 'none' : 'block' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            <div id="cardContainer" className={loading ? "hidden" : "card-container" }>
                {
                    bookListArray.map((value, index) => {
                        return (
                            <Card id={`card-${index + 1}`} 
                                key={`card-${index + 1}`} 
                                style={{ width: '15rem', height: '28rem'}}
                                bg="light" text="dark"
                                onClick={()=> {openDetails(value.book_id)}}>
                                {/* <Card.Header>{value.title}</Card.Header> */}
                                <Card.Img 
                                    variant="bottom" 
                                    src={value.cover} 
                                    className="card-image" />
                                <Card.Body className="content1">
                                    <Card.Title>{value.title}</Card.Title>
                                    <Card.Text>
                                        by {value.author}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body className="hidden card-desc">
                                    <Card.Title>{value.title}</Card.Title>
                                    <Card.Text>
                                        {value.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">Ratings: {value.ratings != null ? value.ratings : 'No ratings'} / 5</Card.Footer>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default BookListComponent;