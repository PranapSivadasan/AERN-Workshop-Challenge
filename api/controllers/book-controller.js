const dbClient = require('../configuration/db-config');
const validation = require('../services/validation-service');

var validSortColumns = [
    {
        key: 'createdtime',
        value: '__createdtime__'
    }
];

const getAllBookDetails = (req, res) => {
    console.log('getAllBookDetails');
    var sortBy, sortOrder;
    sortBy = validation.validateSortColumn(req.params.column, validSortColumns);
    if (sortBy === 'ERROR') {
        return res.status(489).json(
            {
                errorCode: 489,
                message: `Invalid sort column - ${req.params.column}`
            }
        )
    }
    sortOrder = validation.validateSortOrder(req.params.order);
    if (sortOrder === 'ERROR') {
        return res.status(489).json(
            {
                errorCode: 489,
                message: `Invalid sort order - ${req.params.order}`
            }
        );
    }
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books ORDER BY ${sortBy} ${sortOrder}`, 
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    });
}

const getBookDetailsById = (req, res) => {
    console.log('getBookDetailsById');
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books WHERE book_id = '${req.params.bookId}'`, 
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    });
}

const getBookByTitle = (req, res) => {
    console.log('searchBookByTitle');
    var title, sortBy, sortOrder;
    if (validation.isUndefinedOrNull(req.params.title)) {
        title = '';
    } else {
        title = (req.params.title).trim();
    }
    sortBy = validation.validateSortColumn(req.params.column, validSortColumns);
    if (sortBy === 'ERROR') {
        return res.status(489).json(
            {
                errorCode: 489,
                message: `Invalid sort column - ${req.params.column}`
            }
        )
    }
    sortOrder = validation.validateSortOrder(req.params.order);
    if (sortOrder === 'ERROR') {
        return res.status(489).json(
            {
                errorCode: 489,
                message: `Invalid sort order - ${req.params.order}`
            }
        );
    }
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books WHERE title like '%${title}%' ORDER BY ${sortBy} ${sortOrder}`,
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    });
}

module.exports = {
    getAllBookDetails,
    getBookDetailsById,
    getBookByTitle
}