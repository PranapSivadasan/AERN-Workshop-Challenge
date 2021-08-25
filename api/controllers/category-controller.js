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

module.exports = {
    getCategories,
    getCategoryById
}