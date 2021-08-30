/**
 * Book controller - It consist of all the API related to books table.
 */

const dbClient = require('../configuration/db-config');
const validation = require('../services/validation-service');
const common = require('../services/common-service');
const bookService = require('../services/book-service');

const tableName = 'books';
const table = `${process.env.SCHEMA}.${tableName}`;

/**
 * To support sorting on a table column, include the same here.
 */
var validSortColumns = [
    {
        key: 'createdtime',
        value: '__createdtime__'
    },
    {
        key: 'ratings',
        value: 'ratings'
    },
    {
        key: 'title',
        value: 'title'
    }
];

/**
 * API to fetch the book details for a given book id.
 */
const getBookDetailsById = (req, res) => {
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books WHERE book_id = '${req.params.bookId}'`,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        });
}

/**
 * API to list all the books along with search and filters.
 */
const getAllBookDetailsWithFilters = (req, res) => {
    var title, sortBy, sortOrder, catId, author;
    title = common.processReqParams(req.params.title);
    catId = common.processReqParams(req.params.catId);
    author = common.processReqParams(req.params.author);
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
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.books WHERE title like '%${title}%' AND category_id like '%${catId}%' AND author like '%${author}%' ORDER BY ${sortBy} ${sortOrder}`,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        });
}

/**
 * API to list all the book authors.
 */
const getAuthors = (req, res) => {
    dbClient.query(`SELECT DISTINCT author from ${process.env.SCHEMA}.books`,
        (error, response) => {
            var authorList = [];
            if (error) {
                return res.status(489).json(error);
            }
            for (i = 0; i < response.data.length; i++) {
                var authors = (response.data[i].author).split(',');
                for (j = 0; j < authors.length; j++) {
                    if (!authorList.includes(authors[j])) {
                        authorList.push(authors[j].trim());
                    }
                }
            }
            return res.status(200).json({ 'authors': authorList });
        })

}

/**
 * API to create a book.
 */
const createBook = (req, res) => {
    const validBody = bookService.validateCreateBookColumns(req.body);
    if (!validBody) {
        return res.status(489).json({ code: 489, message: "Invalid input in payload." });
    }
    const checkQuery = `SELECT * from ${table} WHERE title = '${req.body.title}'`;
    dbClient.query(checkQuery,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length > 0) {
                return res.status(489).json({ code: 489, message: "Book with the same title already exist." });
            } else {
                const createQuery = `INSERT INTO ${table} (title, website, pages, description, cover, category_id, author, ratings) 
                values ('${req.body.title}', '${req.body.website}', ${req.body.pages}, '${req.body.description}', '${req.body.cover}', '${req.body.cat_id}', '${req.body.author}', '${req.body.ratings}')`;
                dbClient.query(createQuery,
                    (error, response) => {
                        if (error) {
                            return res.status(489).json(error);
                        }
                        return res.status(200).json({ code: response.statusCode, message: "Book added successfully!" });
                    })
            }
        });
}

/**
 * API to update/modify a book.
 */
const updateBook = (req, res) => {
    const validBody = bookService.validateCreateBookColumns(req.body) && !validation.isEmpty(req.body.book_id);
    if (!validBody) {
        return res.status(489).json({ code: 489, message: "Invalid input in payload." });
    }
    const checkQuery = `SELECT * from ${table} WHERE book_id = '${req.body.book_id}'`;
    dbClient.query(checkQuery,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length === 0) {
                return res.status(489).json({ code: 489, message: "Provide a valid book id." });
            } else {
                const updateQuery = `UPDATE ${table} SET title = '${req.body.title}' , website = '${req.body.website}', pages = ${req.body.pages}, description = '${req.body.description}', cover = '${req.body.cover}', category_id = '${req.body.cat_id}', author = '${req.body.author}', ratings = '${req.body.ratings}' WHERE book_id = '${req.body.book_id}'`;
                dbClient.query(updateQuery,
                    (error, response) => {
                        if (error) {
                            return res.status(489).json(error);
                        }
                        return res.status(200).json({ code: response.statusCode, message: "Book updated successfully!" });
                    })
            }
        });
}

/**
 * API to delete a book.
 */
const deleteBook = (req, res) => {
    const checkQuery = `SELECT * from ${table} WHERE book_id='${req.params.bookId}'`;
    dbClient.query(checkQuery,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length === 0) {
                return res.status(489).json({ code: 489, message: "Book not found" });
            }
            const deleteQuery = `DELETE from ${table} WHERE book_id='${req.params.bookId}'`;
            dbClient.query(deleteQuery,
                (error, response) => {
                    if (error) {
                        return res.status(489).json(error);
                    }
                    return res.status(200).json({ code: response.statusCode, message: "Book deleted successfully." });
                });
        })
}

/**
 * API to drop a column in any table.
 * This is not exposed outsie, used for internal purpose
 */
const drop = () => {
    const options = {
        schema: `${process.env.SCHEMA}`,
        table: 'books',
        attribute: 'isbn',
    };

    dbClient.dropAttribute(options, (err, res) => {
        if (err) console.log(err);
        else console.log(res);
    });
}

module.exports = {
    // drop,
    getBookDetailsById,
    getAllBookDetailsWithFilters,
    getAuthors,
    createBook,
    updateBook,
    deleteBook
}