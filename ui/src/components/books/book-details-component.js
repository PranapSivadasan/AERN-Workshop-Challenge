import React, { useEffect, useState, useRef } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import * as API_CONST from '../../constants/api-constants';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import CreateBookDialog from './create-book-dialog';

const BookDetailsComponent = ({ closeDetails, bookId, refreshList, userDetail }) => {

    const toast = useRef(null);

    const [bookDetail, updateBookDetail] = useState([]);
    const [loading, bookDetailsLoading] = useState(true);
    const [catDetails, updateCatDetails] = useState([]);
    const [update, setUpdateModal] = useState(false);
    const [bookToEdit, updateBookToEdit] = useState(null);
    const [refreshPage, updateRefresh] = useState(false);
    const [deleteModal, updateDeleteModal] = useState(false);
    const [showSpinner, updateShowSpinner] = useState(false);

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

                bookDetailsLoading(false);
            }
        }

        init();
    }, [bookId, refreshPage]);

    function openEditBookModal() {
        const selectedBook = {
            book_id: bookDetail.book_id,
            title: bookDetail.title,
            website: bookDetail.website,
            pages: bookDetail.pages,
            description: bookDetail.description,
            cover: bookDetail.cover,
            cat_id: bookDetail.category_id,
            author: bookDetail.author,
            ratings: bookDetail.ratings
        }
        updateBookToEdit(selectedBook);
        setUpdateModal(true);
    }

    function deleteBook() {
        updateShowSpinner(true);
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`${API_CONST.BOOKS}/${bookDetail.book_id}`, options).then((res) => {
            res.json().then((data) => {
                if (data.code === 200) {
                    toast.current.show(
                        { severity: 'success', summary: 'Success', detail: data?.message, life: 5000 }
                    );
                    refreshList(true);
                    closeDetails();
                } else if (data.code === 489) {
                    toast.current.show(
                        { severity: 'error', summary: 'Failed', detail: data?.message, life: 5000 }
                    );
                } else {
                    toast.current.show(
                        { severity: 'error', summary: 'Failed', detail: "Error deleting the book", life: 5000 }
                    );
                }
            });
            updateShowSpinner(false);
            updateDeleteModal(false);
        });
    }

    const deleteFooter =
        <div>
            <div className={showSpinner ? "w-50" : "hidden"} >
                <ProgressSpinner strokeWidth="5" style={{ width: '50px', height: '50px' }} />
            </div>
            <div className={!showSpinner ? "" : "hidden"}>
                <Button label="Cancel" icon="pi pi-times" onClick={() => updateDeleteModal(false)} className="p-button-primary p-button-outlined" />
                <Button label="Delete" icon="pi pi-check" onClick={() => deleteBook()} className="p-button-danger" />
            </div>
        </div>

    return (
        <div className="stick-top book-details">

            <Toast ref={toast} />
            <div id="loading" style={{ display: !loading ? 'none' : 'block' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            <div id="bookDetails" className={loading ? 'hidden' : ''}>
                <Button icon="pi pi-times"
                    className="p-button-rounded p-button-primary p-button-outlined float-right"
                    onClick={() => { closeDetails() }} />
                <Button icon="pi pi-trash"
                    className={userDetail?.admin ? "p-button-rounded p-button-danger p-button-outlined float-right mr-2" : "hidden"}
                    onClick={() => { updateDeleteModal(true) }} />
                <Button icon="pi pi-pencil"
                    className={userDetail?.admin ? "p-button-rounded p-button-success p-button-outlined float-right mr-2" : "hidden"}
                    onClick={() => { openEditBookModal() }} />
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
            <CreateBookDialog
                openDialog={update}
                bookDetails={bookToEdit}
                closeDialog={(val) => setUpdateModal(val)}
                refresh={(val) => {
                    if (val) {
                        updateRefresh(!refreshPage);
                        refreshList(true);
                    }
                }}
            />
            <Dialog header={bookDetail?.title} visible={deleteModal} style={{ width: '50vw' }} footer={deleteFooter} onHide={() => updateDeleteModal(false)}>
                <p>Do you want to delete this book ?</p>
            </Dialog>
        </div>
    );
}

export default BookDetailsComponent;