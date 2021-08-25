const dbClient = require('../configuration/db-config');
const common = require('../services/common-service');

const tableName = 'ratings';
const table = `${process.env.SCHEMA}.${tableName}`;

const getRatings = (req, res) => {
    console.log('getRatings');
    var bookId;
    bookId = common.processReqParams(req.params.bookId);
    dbClient.query(`SELECT ${tableName}.book_id, AVG(${tableName}.rating) as rating from ${table}
    WHERE book_id like '%${bookId}%' GROUP BY ${tableName}.book_id`,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        });
}

const postRating = (req, res) => {
    console.log('postRating');
    const recAlreadyExist = `SELECT rating from ${table} WHERE book_id='${req.body.book_id}' AND user_id='${req.body.user_id}'`;
    const insertQuery = `INSERT INTO ${table} (book_id, rating, user_id) VALUES('${req.body.book_id}', ${req.body.rating}, '${req.body.user_id}' )`;
    const upadteQuery = `UPDATE ${table} SET rating=${req.body.rating} WHERE book_id='${req.body.book_id}' AND user_id='${req.body.user_id}'`;

    dbClient.query(recAlreadyExist,
        (error, response) => {
            if (error) {
                // console.log(error);
                return res.status(489).json(error);
            }
            if (response.data.length > 0) {
                // console.log(response.data, '\n', upadteQuery);
                dbClient.query(upadteQuery,
                    (updateError, updateResponse) => {
                        if (updateError) {
                            return res.status(489).json(updateError);
                        }
                        return res.status(200).json({
                            statusCode: updateResponse.statusCode,
                            message: 'Thanks for updating your rating!'
                        });
                    });
            } else {
                // console.log(response.data, '\n', insertQuery);
                dbClient.query(insertQuery,
                    (insertError, insertResponse) => {
                        if (insertError) {
                            return res.status(489).json(insertError);
                        }
                        return res.status(200).json({
                            statusCode: insertResponse.statusCode,
                            message: 'Thank you for rating this book!'
                        });
                    });
            }

        });
}

module.exports = {
    getRatings,
    postRating
}