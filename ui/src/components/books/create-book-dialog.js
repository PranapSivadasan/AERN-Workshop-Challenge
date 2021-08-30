import React, { useEffect, useState, useRef } from 'react';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { SelectButton } from 'primereact/selectbutton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Rating } from 'primereact/rating';

import { Row, Col } from 'react-bootstrap';

import * as API_CONST from '../../constants/api-constants';

const CreateBookDialog = ({ openDialog, bookDetails, closeDialog, refresh }) => {

    const toast = useRef(null);

    const newCatSchema = { name: '', desc: '' };
    const authorSelOptions = [
        { label: 'Select from existing authors', value: 1 },
        { label: 'New author', value: 2 }
    ];
    const newBook = {
        book_id: '',
        title: '',
        website: '',
        pages: undefined,
        description: '',
        cover: '',
        cat_id: undefined,
        author: undefined,
        ratings: undefined
    }
    const [bookPayload, updateBookPayload] = useState(newBook);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [category, setCategory] = useState(null);
    const [author, setAuthor] = useState(null);
    const [categoryOptions, updateCategoryOptions] = useState([]);
    const [authorOptions, updateAuthorOptions] = useState([]);

    // category dialog
    const [displayAddCategory, setDisplayCategory] = useState(false);
    const [newCategory, updateNewCategory] = useState(newCatSchema);
    const [newCategoryName, setNewCatName] = useState('');
    const [newCategoryDesc, setNewCatDescription] = useState('');
    const [authorSel, updateAuthorSelection] = useState(1);
    const [showSpinner, updateShowSpinner] = useState(false);

    useEffect(() => {
        async function initCatAndAuth() {
            if (openDialog) {
                let catQuery = API_CONST.CATEGORY;
                const categoryListResponse = await (await fetch(catQuery)).json();
                let catOpt = [];
                categoryListResponse.map((value, index) => {
                    catOpt.push({
                        key: value.cat_id,
                        label: value.name
                    })
                })
                updateCategoryOptions(catOpt);

                let authorQuery = API_CONST.AUTHOR_LIST;
                const authListResponse = await (await fetch(authorQuery)).json();
                let authOpt = [];
                authListResponse.authors.map((value, index) => {
                    authOpt.push({
                        key: value,
                        label: value
                    })
                })
                updateAuthorOptions(authOpt);
            }
        }

        initCatAndAuth();
        setDisplayDialog(openDialog);
    }, [openDialog]);

    useEffect(() => {
        if (bookDetails !== null) {
            updateBookPayload(bookDetails);
        }
    }, [bookDetails])

    function createBook() {
        updateShowSpinner(true);
        const options = {
            method: 'POST',
            body: JSON.stringify(bookPayload),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log('createBook');
        console.log(bookPayload);
        fetch(API_CONST.BOOKS, options).then((res) => {
            res.json().then((data) => {
                console.log(data);
                if (data.code === 200) {
                    toast.current.show(
                        { severity: 'success', summary: 'Success', detail: data?.message, life: 5000 }
                    );
                } else if (data.code === 489) {
                    toast.current.show(
                        { severity: 'error', summary: 'Failed', detail: data?.message, life: 5000 }
                    );
                } else {
                    toast.current.show(
                        { severity: 'error', summary: 'Failed', detail: "Error Adding a book", life: 5000 }
                    );
                }
            });
            refresh(true);
            closeCreateBookDialog();
            updateShowSpinner(false);
        });
    }

    function updateBook() {
        updateShowSpinner(true);
        console.log('updateBook', bookPayload);
        const options = {
            method: 'PUT',
            body: JSON.stringify(bookPayload),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(API_CONST.BOOKS, options).then((res) => {
            res.json().then((data) => {
                console.log(data);
                if (data.code === 200) {
                    toast.current.show(
                        { severity: 'success', summary: 'Success', detail: data?.message, life: 500000 }
                    );
                } else if (data.code === 489) {
                    toast.current.show(
                        { severity: 'error', summary: 'Failed', detail: data?.message, life: 5000 }
                    );
                } else {
                    toast.current.show(
                        { severity: 'error', summary: 'Failed', detail: "Error updating a book", life: 5000 }
                    );
                }
            });
            refresh(true);
            closeCreateBookDialog();
            updateShowSpinner(false);
        });
    }

    function closeCreateBookDialog() {
        closeDialog(false);
        updateBookPayload(newBook);
        setDisplayDialog(false);
    }

    function closeCategoryDialog() {
        updateNewCategory(newCatSchema);
        setDisplayCategory(false);
    }

    function validCreateUpdateBookForm() {
        for (const key in bookPayload) {
            if (key !== 'book_id') {
                if (bookPayload[key] === null || bookPayload[key] === undefined || String(bookPayload[key]).trim() === '') {
                    return false;
                }
            }
        }
        return true;
    }

    const footer =
        <div>
            <div className={showSpinner ? "w-50" : "hidden"} >
                <ProgressSpinner strokeWidth="5" style={{ width: '50px', height: '50px' }} />
            </div>
            <div className={!showSpinner ? "" : "hidden"}>
                <Message severity="warn" text="All the above fields are mandatory" className={validCreateUpdateBookForm() ? "hidden" : "float-left ml-3"} disabled={!validCreateUpdateBookForm()} />
                <Button label="Cancel" icon="pi pi-times" onClick={() => closeCreateBookDialog()} className="p-button-danger p-button-outlined" />
                <Button label="Create" icon="pi pi-check" onClick={() => createBook()} className={bookDetails == null ? "p-button-success" : "hidden"} disabled={!validCreateUpdateBookForm()} />
                <Button label="Update" icon="pi pi-check" onClick={() => updateBook()} className={bookDetails !== null ? "p-button-success" : "hidden"} disabled={!validCreateUpdateBookForm()} />
            </div>
        </div>

    const categoryFooter =
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => closeCategoryDialog(false)} className="p-button-danger p-button-outlined" />
            <Button label="Add" icon="pi pi-check" onClick={() => setDisplayCategory(false)} />
        </div>

    const categoryDialog =
        <Dialog header="New Category" visible={displayAddCategory} style={{ width: '50vw' }} footer={categoryFooter} onHide={() => closeCategoryDialog(false)}>
            <div className="my-2"> Category Name: </div>
            <InputText value={newCategory.name}
                style={{ width: '80%' }}
                onChange={(e) => updateNewCategory({ name: e.target.value, desc: newCategory.desc })} />
            <div className="my-2"> Category Description: </div>
            <InputTextarea value={newCategory.desc}
                style={{ width: '80%' }}
                onChange={(e) => updateNewCategory({ name: newCategory.name, desc: e.target.value })} rows={3} />
        </Dialog>

    return (
        <div>
            <Toast ref={toast} />
            <Dialog header={bookDetails == null ? "Add a new book" : `Edit book - ${bookPayload.title}`} visible={displayDialog} style={{ width: '75vw' }} footer={footer} onHide={() => closeCreateBookDialog()}>
                <Row>
                    <Col>
                        <div id="title" className="filter-div">
                            <div className="my-2"> Book Title: </div>
                            <InputText value={bookPayload.title}
                                style={{ width: '100%' }}
                                placeholder="Enter a Title"
                                onChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: e.target.value,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: bookPayload.author,
                                        ratings: bookPayload.ratings
                                    });
                                }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <div id="category" className="filter-div">
                            <div> Category: </div>
                            <Dropdown value={bookPayload.cat_id}
                                options={categoryOptions}
                                onChange={(type) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: type.value,
                                        author: bookPayload.author,
                                        ratings: bookPayload.ratings
                                    });
                                }}
                                className="filter-dropdown"
                                showClear
                                style={{ width: '100%' }}
                                optionLabel="label"
                                optionValue="key"
                                placeholder="Select a category" />
                            {/* <Button icon="pi pi-plus" title="Add new category"
                                className="p-button-rounded p-button-primary p-button-outlined ml-2 mt-2"
                                onClick={() => { setDisplayCategory(true) }} /> */}
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div id="pages" className="filter-div">
                            <div> Pages: </div>
                            <InputNumber value={bookPayload.pages}
                                onValueChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: e.target.value,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: bookPayload.author,
                                        ratings: bookPayload.ratings
                                    });
                                }}
                                min={0}
                                className="filter-dropdown"
                                style={{ width: '100%' }}
                                showButtons
                                placeholder="Total pages"
                            />
                        </div>
                    </Col>
                </Row>
                {/* <div id="author" className="filter-div mb-2">
                    Author: */}
                {/* <SelectButton value={authorSel}
                        options={authorSelOptions}
                        optionLabel="label"
                        optionValue="value"
                        className="mt-2"
                        onChange={(e) => updateAuthorSelection(e.value)} /> */}
                {/* </div> */}
                <Row>
                    {/* <Col sm={12} md={6}>
                        <div id="authorSelect" className="filter-div">
                            <Dropdown value={authorSel !== 1 ? undefined : bookPayload.author}
                                options={authorOptions}
                                disabled={authorSel !== 1}
                                onChange={(type) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: type.value
                                    });
                                }}
                                className="filter-dropdown"
                                showClear
                                style={{ width: '100%' }}
                                optionLabel="label"
                                optionValue="key"
                                placeholder="Select an author" />
                        </div>
                    </Col> */}
                    <Col sm={12} md={6}>
                        <div id="authorInput" className="filter-div">
                            <div className="my-2"> Authors: </div>
                            <InputText value={bookPayload.author}
                                style={{ width: '100%' }}
                                placeholder="Enter multiple author(s) as CSV"
                                onChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: e.target.value,
                                        ratings: bookPayload.ratings
                                    });
                                }} />
                        </div>
                    </Col>
                    <Col>
                        <div id="authorInput" className="filter-div">
                            <div className="my-2"> Ratings: </div>
                            <Rating value={bookPayload.ratings}
                                cancel={false}
                                onChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: bookPayload.author,
                                        ratings: e.value
                                    });
                                }} />
                            {/* <InputText value={bookPayload.author}
                                style={{ width: '100%' }}
                                placeholder="Enter author(s) as CSV"
                                onChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: e.target.value
                                    });
                                }} /> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <div id="websiteLink" className="filter-div">
                            <div className="my-2"> Website link: </div>
                            <InputText value={bookPayload.website}
                                style={{ width: '100%' }}
                                placeholder="Enter the link of book"
                                onChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: e.target.value,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: bookPayload.author,
                                        ratings: bookPayload.ratings
                                    });
                                }} />
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div id="coverPageLink" className="filter-div">
                            <div className="my-2"> Cover page link: </div>
                            <InputText value={bookPayload.cover}
                                style={{ width: '100%' }}
                                placeholder="Enter the link of cover page"
                                onChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: bookPayload.description,
                                        cover: e.target.value,
                                        cat_id: bookPayload.cat_id,
                                        author: bookPayload.author,
                                        ratings: bookPayload.ratings
                                    });
                                }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id="desc" className="filter-div">
                            <div className="my-2"> Book Description: </div>
                            <InputTextarea value={bookPayload.description}
                                style={{ width: '100%' }}
                                rows={5}
                                placeholder="Use backslash to escape the single quotes."
                                onChange={(e) => {
                                    updateBookPayload({
                                        book_id: bookPayload.book_id,
                                        title: bookPayload.title,
                                        website: bookPayload.website,
                                        pages: bookPayload.pages,
                                        description: e.target.value,
                                        cover: bookPayload.cover,
                                        cat_id: bookPayload.cat_id,
                                        author: bookPayload.author,
                                        ratings: bookPayload.ratings
                                    });
                                }} />
                        </div>
                    </Col>
                </Row>
            </Dialog>
            {categoryDialog}
        </div>
    );
}

export default CreateBookDialog;