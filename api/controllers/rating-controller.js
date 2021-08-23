const dbClient = require('../configuration/db-config');
const common = require('../services/common-service');

const tableName = 'ratings';

const getRatings = (req, res) => {
    console.log('getRatings');
    var bookId;
    bookId = common.processReqParams(req.params.bookId);
    dbClient.query(`SELECT ${tableName}.book_id, AVG(${tableName}.rating) as rating from ${process.env.SCHEMA}.${tableName}
    WHERE book_id like '%${bookId}%' GROUP BY ${tableName}.book_id`,
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    });
}

module.exports = {
    getRatings
}