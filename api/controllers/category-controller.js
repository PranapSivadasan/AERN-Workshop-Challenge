const dbClient = require('../configuration/db-config');

const tableName = 'categories';
const table = `${process.env.SCHEMA}.${tableName}`;

const getCategories = (req, res) => {
    console.log('getCategories');
    dbClient.query(`SELECT * from ${table}`,
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    })
}

const getCategoryById = (req, res) => {
    console.log('getCategoryById');
    dbClient.query(`SELECT * from ${table} WHERE cat_id = '${req.params.catId}'`,
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data[0]);
    })
}

const getCatBookCount = (req, res) => {
    console.log('getCatGroup');
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