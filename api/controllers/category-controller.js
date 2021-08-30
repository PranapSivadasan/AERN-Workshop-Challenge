/**
 * Category controller - It consist of all the API related to categories table.
 */

const dbClient = require('../configuration/db-config');

const tableName = 'categories';
const table = `${process.env.SCHEMA}.${tableName}`;

/**
 * API to get all the categories 
 */
const getCategories = (req, res) => {
    dbClient.query(`SELECT * from ${table}`,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        })
}

/**
 * API to get the category by id
 */
const getCategoryById = (req, res) => {
    dbClient.query(`SELECT * from ${table} WHERE cat_id = '${req.params.catId}'`,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data[0]);
        })
}

/**
 * API to get count of books in each category
 */
const getCatBookCount = (req, res) => {
    const query = `select categories.name, count(categories.name) as bookCount FROM book_details.books INNER JOIN book_details.categories ON categories.cat_id = books.category_id GROUP BY categories.name`;
    dbClient.query(query,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        })
}

module.exports = {
    getCategories,
    getCategoryById,
    getCatBookCount
}