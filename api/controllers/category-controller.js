const dbClient = require('../configuration/db-config');

const getCategories = (req, res) => {
    console.log('getCategories');
    dbClient.query(`SELECT * from ${process.env.SCHEMA}.categories`,
    (error, response) => {
        if (error) {
            return res.status(489).json(error);
        }
        return res.status(200).json(response.data);
    })
}

module.exports = {
    getCategories
}