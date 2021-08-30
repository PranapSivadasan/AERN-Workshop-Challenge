function validateSortOrder(order) {
    if (isEmpty(order)) {
        return 'DESC';
    }
    if ((order).toLowerCase().trim() === 'asc') {
        return 'ASC';;
    } else if ((order).toLowerCase().trim() === 'desc') {
        return 'DESC';
    }
    return 'ERROR';
}

function validateSortColumn(column, columnArray) {
    if (isEmpty(column)) {
        return columnArray[0].value;
    }
    for (i = 0; i < columnArray.length; i++) {
        if ((column).toLowerCase().trim() === columnArray[i].key) {
            return columnArray[i].value;
        }
    }
    return 'ERROR';
}

function isUndefinedOrNull(value) {
    if (value === undefined || value === null) {
        return true;
    }
    return false;
}

function isEmpty(value) {
    if (isUndefinedOrNull(value)) {
        return true;
    } else if (value.trim() === '') {
        return true;
    }
    return false;
}


module.exports = {
    validateSortOrder,
    validateSortColumn,
    isUndefinedOrNull,
    isEmpty
}