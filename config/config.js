/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ debug: true });

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATA_BASE,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    password: process.env.DATABASE_PASSWORD || null,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
