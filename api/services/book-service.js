const validation = require('./validation-service');


function validateCreateBookColumns(payload) {
    console.log('validateCreateBookColumns');
    if (validation.isEmpty(payload.title)) {
        return false;
    }
    if (validation.isEmpty(payload.website)) {
        return false;
    }
    if (validation.isUndefinedOrNull(payload.pages)) {
        return false;
    }
    // if (validation.isUndefinedOrNull(payload.isbn)) {
    //     return false;
    // }
    if (validation.isEmpty(payload.description)) {
        return false;
    }
    if (validation.isEmpty(payload.cover)) {
        return false;
    }
    if (validation.isEmpty(payload.cat_id)) {
        return false;
    }
    if (validation.isEmpty(payload.author)) {
        return false;
    }
    return true;
}

module.exports = {
    validateCreateBookColumns
}