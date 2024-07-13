require('dotenv').config();
const { Pool } = require('pg');

const { DB_HOST, PG_DATABASE, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = new Pool({
  host: DB_HOST,
  database: PG_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  allowExitOnIdle: true
});

module.exports = database;