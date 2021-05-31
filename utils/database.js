const Sequelize = require('sequelize');

const DB_NAME = 'amd_table';
const USERNAME = 'root';
const PASSWORD = 'root';

const sequelize = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
