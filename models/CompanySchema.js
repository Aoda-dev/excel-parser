const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Company = sequelize.define('companymodels', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  counts: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dillerPrice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  availability: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  inBox: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  guarantee: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  codeInCompany: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  articleInCompany: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Company;
