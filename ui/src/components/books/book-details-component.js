import React, { useEffect, useState } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import * as API_CONST from '../../constants/api-constants';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';

const BookDetailsComponent = ({ closeDetails, bookId }) => {

    const [bookDetail, updateBookDetail] = useState([]);
    const [loading, bookDetailsLoading] = useState(true);
    const [catDetails, updateCatDetails] = useState([]);
    const [ratDetails, updateRatDetails] = useState([]);

    useEffect(() => {

        async function init() {
            if (bookId !== null && bookId !== undefined) {

                bookDetailsLoading(true);
                let query = API_CONST.BOOK_DETAILS;
                query = query.replace('[bookId]', bookId);
                const bookDetailResponse = await (await fetch(query)).json();
                updateBookDetail(bookDetailResponse[0]);

                let catQuery = API_CONST.CATEGORY_BY_ID;
                catQuery = catQuery.replace('[catId]', bookDetailResponse[0]?.category_id);
                const catDetailsResponse = await (await fetch(catQuery)).json();
                updateCatDetails(catDetailsResponse);

                let ratQuery = API_CONST.RATINGS_BY_ID;
                ratQuery = ratQuery.replace('[bookId]', bookId);
                const ratDetailsResponse = await (await fetch(ratQuery)).json();
                updateRatDetails(ratDetailsResponse);

                bookDetailsLoading(false);
            }
            // console.log(bookDetail);
        }

        init();
    }, [bookId]);

    return (
        <div className="stick-top book-details">
            <div id="loading" style={{ display: !loading ? 'none' : 'block' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            <div id="bookDetails" className={loading ? 'hidden' : ''}>
                <Button icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-outlined float-right"
                    onClick={() => { closeDetails() }} />
                <h3>{bookDetail?.title}</h3>
                <p><strong>Written by:</strong> {bookDetail?.author}</p>
                <Divider />
                <Row>
                    <Col className="deatils-column">
                        <div id="categoryDiv" className="mb-3">
                            <h6>Category : </h6>
                            <Tag value={catDetails?.name} severity="success" />
                        </div>
                        <div id="ratingsDiv" className="mb-3">
                            <h6>Ratings : {bookDetail?.ratings != null ? bookDetail?.ratings : 'No ratings'} / 5</h6>
                            <Rating value={bookDetail?.ratings} stars={5} cancel={false} />
                        </div>
                        <div id="pagesDiv" className="mb-3">
                            <h6>Number of pages:</h6>
                            <Tag value={bookDetail?.pages} rounded severity="success" />
                        </div>
                        <div id="websiteDiv">
                            <h6>Website :</h6>
                            <Button label="Navigate to website" className="p-button-outlined"
                                onClick={() => { window.open(bookDetail?.website) }} />
                        </div>
                    </Col>
                    <Divider layout="vertical" />
                    <Col className="deatils-column">
                        <h6>Cover Page:</h6>
                        <img src={bookDetail?.cover} className="card-image" />
                    </Col>
                </Row>
                <Divider />
                <Fieldset legend="Description">
                    <p>{bookDetail?.description}</p>
                </Fieldset>
            </div>
        </div>
    );
}

export default BookDetailsComponent;