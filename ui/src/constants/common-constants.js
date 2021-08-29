const FILTER_LIST = {
    search: false,
    category: false,
    author: false
};
const SORT_COLUMNS = [
    {
        key: 'createdtime',
        label: 'Created Time'
    },
    {
        key: 'ratings',
        label: 'Ratings'
    },
    {
        key: 'title',
        label: 'Title'
    }
];
const SORT_ORDER = [
    {
        key: 'asc',
        label: 'Ascending',
        icon: 'pi pi-sort-amount-up'
    },
    {
        key: 'desc',
        label: 'Descending',
        icon: 'pi pi-sort-amount-down'
    }
];

export {
    FILTER_LIST,
    SORT_COLUMNS,
    SORT_ORDER
}