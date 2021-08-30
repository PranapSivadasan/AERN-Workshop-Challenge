/**
 * Ratings controller - It consist of all the API related to ratings table.
 */

const dbClient = require('../configuration/db-config');

const tableName = 'ratings';
const table = `${process.env.SCHEMA}.${tableName}`;

/**
 * API to get all the ratings group by books
 */
const getRatings = (req, res) => {
    dbClient.query(`SELECT ${tableName}.book_id, AVG(${tableName}.rating) as rating from ${table} GROUP BY ${tableName}.book_id`,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        });
}

/**
 * API to get the ratings based on book id
 */
const getRatingsById = (req, res) => {
    dbClient.query(`SELECT * from ${table} WHERE book_id = '${req.params.bookId}'`,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        });
}

/**
 * API to rate a book
 */
const postRating = (req, res) => {
    const recAlreadyExist = `SELECT rating from ${table} WHERE book_id='${req.body.book_id}' AND user_id='${req.body.user_id}'`;
    const insertQuery = `INSERT INTO ${table} (book_id, rating, user_id) VALUES('${req.body.book_id}', ${req.body.rating}, '${req.body.user_id}' )`;
    const upadteQuery = `UPDATE ${table} SET rating=${req.body.rating} WHERE book_id='${req.body.book_id}' AND user_id='${req.body.user_id}'`;

    dbClient.query(recAlreadyExist,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length > 0) {
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
    postRating,
    getRatingsById
}