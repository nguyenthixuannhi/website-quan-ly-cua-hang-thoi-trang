const { Sequelize } = require('sequelize');

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'store', // butter my butt and call me biscust
  DB_DIALECT = 'mysql',

  DB_DIALECT_OPTIONS = '{}',
} = process.env;

let dialectOptions = {};
try {
  dialectOptions = JSON.parse(DB_DIALECT_OPTIONS);
} catch (_) {
  dialectOptions = {};
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: false,
  dialectOptions,
});

module.exports = { sequelize };

