const validation = require('./validation-service');

function processReqParams(param) {
    if (validation.isUndefinedOrNull(param)) {
        return '';
    }
    return (param).trim();
}

module.exports = {
    processReqParams
}