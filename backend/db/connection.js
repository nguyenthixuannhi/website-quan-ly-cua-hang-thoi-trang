const path = require('path');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = 'admin@123',
  DB_NAME = 'store',
  DB_DIALECT = 'mysql',
  DB_DIALECT_OPTIONS = '{}',
} = process.env;

let parsedDialectOptions = {};
try {
  parsedDialectOptions = JSON.parse(DB_DIALECT_OPTIONS);
} catch (_err) {
  parsedDialectOptions = {};
}

// Merge charset into dialectOptions
const dialectOptions = {
  ...parsedDialectOptions,
  charset: 'utf8mb4',
};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: false,
  dialectOptions,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
});

module.exports = { sequelize };