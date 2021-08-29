import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { SelectButton } from 'primereact/selectbutton';

import * as API_CONST from '../../constants/api-constants';
import * as COMMON_CONST from '../../constants/common-constants';

import CreateBookDialog from './create-book-dialog';

const BookListComponent = ({ openDetails, showDetails, refreshListPage, userDetail }) => {

    const filterList = COMMON_CONST.FILTER_LIST;
    const sortOrderOptions = COMMON_CONST.SORT_ORDER;
    const sortByOptions = COMMON_CONST.SORT_COLUMNS;

    const [bookListArray, updateBookListArray] = useState([]);
    const [loading, bookListLoading] = useState(true);
    const [searchVal, updateSearchVal] = useState('');
    const [searchFlag, updateSearchFlag] = useState(false);
    const [filterFlag, updateFilterFlag] = useState(false);
    const [sortFlag, updateSortFlag] = useState(false);
    const [searchChipVal, updateSearchChipVal] = useState(false);
    const [catChipVal, updateCatChipVal] = useState(false);
    const [authChipVal, updateAuthChipVal] = useState(false);
    const [applyFilter, updateApplyFilter] = useState(filterList);
    const [hideSearchDiv, updateSearchDiv] = useState(showDetails);
    // const [categoryList, updateCategory] = useState([]);
    const [category, setCategory] = useState(null);
    const [author, setAuthor] = useState(null);
    const [sortBy, setSortBy] = useState(COMMON_CONST.SORT_COLUMNS[0]);
    const [sortOrder, setSortOrder] = useState(COMMON_CONST.SORT_ORDER[1]);
    const [displayFilterModal, updateFilterModal] = useState(false);
    const [displaySortModal, updateSortModal] = useState(false);
    const [categoryOptions, updateCategoryOptions] = useState([]);
    const [authorOptions, updateAuthorOptions] = useState([]);
    const [createModal, updateCreateModal] = useState(false);
    const [refreshPage, updateRefresh] = useState(false);

    useEffect(() => {

        async function init() {
            bookListLoading(true);
            let query = API_CONST.BOOK_LIST;
            query = query.replace('[bookTitle]', searchVal);
            query = query.replace('[categoryId]', category !== null && category !== undefined ? category?.key : '');
            query = query.replace('[authorName]', author !== null && author !== undefined ? author?.key : '');
            query = query.replace('[columnName]', sortBy.key);
            query = query.replace('[sortOrder]', sortOrder.key);
            // console.log(query);
            const bookListResponse = await (await fetch(query)).json();
            updateBookListArray(bookListResponse);
            bookListLoading(false);
        }

        init();

    }, [searchFlag, filterFlag, sortFlag, refreshPage]);

    useEffect(() => {
        updateSearchDiv(showDetails);
    }, [showDetails]);

    useEffect(() => {
        updateRefresh(!refreshPage);
    }, [refreshListPage]);

    useEffect(() => {

        async function initCatAndAuth() {
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
            // updateCategory(categoryListResponse);
            // console.log(categoryList);

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
            // updateCategory(categoryListResponse);
        }
        initCatAndAuth();
    }, [refreshPage]);

    function filterRemoved(filter) {
        switch (filter) {
            case 'search':
                updateSearchVal('');
                updateSearchFlag(!searchFlag);
                applyFilter.search = false;
                updateApplyFilter(applyFilter);
                break;
            case 'category':
                setCategory(null);
                updateFilterFlag(!filterFlag);
                applyFilter.category = false;
                updateApplyFilter(applyFilter);
                break;
            case 'author':
                setAuthor(null);
                updateFilterFlag(!filterFlag);
                applyFilter.author = false;
                updateApplyFilter(applyFilter);
                break;
        }
    }

    function isFilterApplied() {
        for (const key in applyFilter) {
            if (applyFilter[key]) {
                return true;
            }
        }
        return false;
    }

    function searchBook() {
        updateSearchFlag(!searchFlag);
        if (searchVal != '') {
            updateSearchChipVal(searchVal);
            applyFilter.search = true;
        }
        updateApplyFilter(applyFilter);
    }

    function filterBook() {
        applyFilter.category = false;
        applyFilter.author = false;
        if (category !== null && category !== undefined) {
            applyFilter.category = true;
            updateCatChipVal(category.label);
        }
        if (author !== null && author !== undefined) {
            applyFilter.author = true;
            updateAuthChipVal(author.label);
        }
        updateApplyFilter(applyFilter);
        updateFilterModal(false);
        updateFilterFlag(!filterFlag);
    }

    function sortBook() {
        console.log('sortBook');
        updateSortModal(false)
        console.log(sortBy, sortOrder);
        updateSortFlag(!sortFlag);
    }

    let renderCards;
    if (bookListArray.length > 0) {
        renderCards =
            <div id="cardContainer" className={loading ? "hidden" : "card-container"}>
                {
                    bookListArray.map((value, index) => {
                        return (
                            <Card id={`card-${index + 1}`}
                                key={`card-${index + 1}`}
                                style={{ width: '15rem', height: '28rem' }}
                                bg="light" text="dark"
                                onClick={() => {
                                    openDetails(value.book_id);
                                    // hideSearchDiv(true);
                                }}>
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
    } else {
        renderCards =
            <div id="cardContainer" className={loading ? "hidden" : "card-container"}>
                <Message severity="info" text="No Books Found !" className="w-75" />
            </div>
    }

    const filterDialogFooter =
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => updateFilterModal(false)} className="p-button-danger p-button-outlined" />
            <Button label="Apply" icon="pi pi-check" onClick={() => filterBook()} />
        </div>
    const renderFilterDialog =
        <Dialog header="Filters" visible={displayFilterModal} style={{ width: '50vw' }} footer={filterDialogFooter} onHide={() => updateFilterModal(false)}>
            <div id="categoryFilter" className="filter-div">
                <div> Category: </div>
                <Dropdown value={category}
                    options={categoryOptions}
                    onChange={(type) => {
                        setCategory(type.value);
                    }}
                    className="filter-dropdown"
                    showClear
                    optionLabel="label"
                    placeholder="Select a category" />
            </div>
            <div id="authorFilter" className="filter-div">
                <div> Author: </div>
                <Dropdown value={author}
                    options={authorOptions}
                    onChange={(type) => {
                        setAuthor(type.value);
                    }}
                    className="filter-dropdown"
                    showClear
                    optionLabel="label"
                    placeholder="Select an author" />
            </div>
        </Dialog>;

    const sortDialogFooter =
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => updateSortModal(false)} className="p-button-danger p-button-outlined" />
            <Button label="Apply" icon="pi pi-check" onClick={() => sortBook()} />
        </div>

    const renderSortDialog =
        <Dialog header="Sorting" visible={displaySortModal} style={{ width: '50vw' }} footer={sortDialogFooter} onHide={() => updateSortModal(false)}>
            <div id="sortColumn" className="filter-div">
                <div> Sort By: </div>
                <Dropdown value={sortBy}
                    options={sortByOptions}
                    onChange={(type) => {
                        setSortBy(type.value);
                    }}
                    className="filter-dropdown"
                    optionLabel="label"
                    placeholder="Select a option" />
            </div>
            <div id="authorFilter" className="filter-div">
                <div> Sort Order: </div>
                <SelectButton value={sortOrder}
                    options={sortOrderOptions}
                    onChange={(type) => {
                        setSortOrder(type.value);
                    }}
                    itemTemplate={(option) => {
                        return <i className={option.icon} title={option.label}></i>;
                    }}
                    className="filter-dropdown"
                    unselectable={false} />
            </div>
        </Dialog>;

    return (
        <div id="bookListComponent">
            <div>
                <div id="searchDiv" className={hideSearchDiv ? 'hidden' : 'p-1 filter-bar'}>
                    <div className="p-inputgroup w-25 d-inline">
                        <InputText value={searchVal}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    searchBook();
                                }
                            }}
                            onChange={(e) => updateSearchVal(e.target.value)}
                            placeholder="Search by title"
                            className="w-25" />
                        <Button icon="pi pi-search" title="Search"
                            className="p-button-primary"
                            onClick={() => searchBook()} />
                    </div>
                    <Button icon="pi pi-filter" title="Filter"
                        className="p-button-rounded p-button-primary p-button-outlined ml-2"
                        onClick={() => updateFilterModal(true)} />
                    <Button icon="pi pi-sort-alt" title="Sort"
                        className="p-button-rounded p-button-primary p-button-outlined ml-2"
                        onClick={() => { updateSortModal(true) }} />
                    <Button icon="pi pi-plus" title="Add new book"
                        className={userDetail?.admin ? "p-button-rounded p-button-success p-button-outlined ml-2" : "hidden"}
                        onClick={() => { updateCreateModal(true) }} />
                    <div id="appliedFiltersDiv" className={isFilterApplied() ? 'mt-2' : 'hidden'}>
                        Applied Filters :
                        <Chip className={applyFilter.search ? "custom-chip ml-2 px-3" : "hidden"} template={
                            <div>
                                <span>Search : {searchChipVal}</span>
                                <span className="pl-1 pi pi-times-circle"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => filterRemoved('search')}></span>
                            </div>
                        } />
                        <Chip className={applyFilter.category ? "custom-chip ml-2 px-3" : "hidden"} template={
                            <div>
                                <span>Category : {catChipVal}</span>
                                <span className="pl-1 pi pi-times-circle"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => filterRemoved('category')}></span>
                            </div>
                        } />
                        <Chip className={applyFilter.author ? "custom-chip ml-2 px-3" : "hidden"} template={
                            <div>
                                <span>Author : {authChipVal}</span>
                                <span className="pl-1 pi pi-times-circle"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => filterRemoved('author')}></span>
                            </div>
                        } />
                    </div>
                </div>
                <div id="loading" style={{ display: !loading ? 'none' : 'block' }}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                {renderCards}
                {renderFilterDialog}
                {renderSortDialog}
                <CreateBookDialog
                    openDialog={createModal}
                    bookDetails={null}
                    closeDialog={(val) => updateCreateModal(val)}
                    refresh={(val) => {
                        if (val) {
                            updateRefresh(!refreshPage);
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default BookListComponent;