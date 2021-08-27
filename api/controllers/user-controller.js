const dbClient = require('../configuration/db-config');
const crypto = require('../services/encryption-service');

const tableName = 'users';
const table = `${process.env.SCHEMA}.${tableName}`;

const getUserDetails = (req, res) => {
    console.log('getUserDetails');
    const query = `SELECT * from ${table} WHERE name = '${req.params.user}' OR email_id = '${req.params.user}'`;
    dbClient.query(query,
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            return res.status(200).json(response.data);
        });
}

const createUser = (req, res) => {
    console.log('createUser');
    // console.log(req.body.password);
    // console.log(crypto.encrypt(req.body.password), crypto.decrypt({ iv: '08d20579dfe571840c7ab70e0a4519cb', content: '8e' }));
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
                // console.log(createQuery);
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

const verifyUser = (req, res) => {
    console.log('verifyUser');
    const checkUser = `SELECT password FROM ${table} WHERE name='${req.body.user}' OR email_id='${req.body.user}'`;
    dbClient.query(checkUser, 
        (error, response) => {
            if (error) {
                return res.status(489).json(error);
            }
            if (response.data.length == 0) {
                return res.status(489).json({code: 489, message: 'User doesnot exist. Please register to continue.'});
            } else {
                const pwd = String(response.data[0].password).split(':');
                const decryptPwd = crypto.decrypt({ iv: pwd[0], content: pwd[1] });
                // console.log(decryptPwd);
                if (decryptPwd === req.body.password) {

                    return res.status(200).json({code: response.statusCode, message: 'Credentials verified!'});
                } else {
                    return res.status(489).json({code: 489, message: 'Password incorrect!'})
                }
            }
        })
}

module.exports = {
    // getUserDetails,
    createUser,
    verifyUser
}