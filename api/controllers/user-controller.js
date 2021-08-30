/**
 * User controller - It consist of all the API related to users table.
 */

const dbClient = require('../configuration/db-config');
const crypto = require('../services/encryption-service');

const tableName = 'users';
const table = `${process.env.SCHEMA}.${tableName}`;

/**
 * API to get a user details based on username / email
 */
const getUserDetails = (req, res) => {
    const query = `SELECT name, email_id, admin from ${table} WHERE name = '${req.params.user}' OR email_id = '${req.params.user}'`;
    dbClient.query(query,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length === 0) {
                return res.status(489).json({ code: 489, message: "User details not found!" })
            }
            return res.status(200).json(response.data[0]);
        });
}

/**
 * API to create a user
 */
const createUser = (req, res) => {
    const checkUser = `SELECT name, email_id FROM ${table} WHERE name='${req.body.name}' OR email_id='${req.body.email_id}'`;
    dbClient.query(checkUser,
        (error, resposne) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (resposne.data.length > 0) {
                return res.status(489).json({ code: 489, message: 'User name or email id is already registered' })
            } else {
                const encryptVal = crypto.encrypt(req.body.password);
                const encryptedPwd = `${encryptVal.iv}:${encryptVal.content}`;
                const createQuery = `INSERT INTO ${table} (name, email_id, password) VALUES ('${req.body.name}', '${req.body.email_id}', '${encryptedPwd}')`;
                dbClient.query(createQuery,
                    (error, response) => {
                        if (error) {
                            return res.status(489).json(error);
                        }
                        return res.status(200).json({ code: response.statusCode, message: 'User registered successfully!' });
                    })
            }
        })
}

/**
 * API to verify credentials of the logged in user
 */
const verifyUser = (req, res) => {
    const checkUser = `SELECT password FROM ${table} WHERE name='${req.body.user}' OR email_id='${req.body.user}'`;
    dbClient.query(checkUser,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length == 0) {
                return res.status(489).json({ code: 489, message: 'User doesnot exist. Please register to continue.' });
            } else {
                const pwd = String(response.data[0].password).split(':');
                const decryptPwd = crypto.decrypt({ iv: pwd[0], content: pwd[1] });
                if (decryptPwd === req.body.password) {

                    return res.status(200).json({ code: response.statusCode, message: 'Credentials verified!' });
                } else {
                    return res.status(489).json({ code: 489, message: 'Password incorrect!' })
                }
            }
        })
}

const getUserCount = (req, res) => {
    const query = `SELECT count(*) as totalUsers FROM ${table}`;
    dbClient.query(query,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length === 0) {
                return res.status(489).json({ code: 489, message: "User not found!" })
            }
            return res.status(200).json(response.data[0]);
        });
}

module.exports = {
    getUserDetails,
    createUser,
    verifyUser,
    getUserCount
}