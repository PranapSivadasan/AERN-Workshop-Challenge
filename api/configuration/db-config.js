/**
 * Configuration to connect to the hosted HARPER DB instance.
 */

const harperive = require('harperive');

const DB_CONFIG = {
  harperHost: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  schema: process.env.SCHEMA
}

const Client = harperive.Client;
const dbClient = new Client(DB_CONFIG);

module.exports = dbClient;