const dbClient = require('../configuration/db-config');

const getAllBookDetails = (req, res) => {
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books`, 
    (error, response) => {
        if (error) {
            res.status(489).json(error);
        }
        res.status(200).json(response.data);
    })
}

const getBookDetailsById = (req, res) => {
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books WHERE book_id = '${req.params.bookId}'`, 
    (error, response) => {
        if (error) {
            res.status(489).json(error);
        }
        res.status(200).json(response.data);
    })
}

module.exports = {
    getAllBookDetails,
    getBookDetailsById
}