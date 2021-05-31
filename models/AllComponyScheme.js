const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Companies = sequelize.define('allcompanies', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  code: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  counts: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  dillerPrice: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  availability: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  inBox: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  guarantee: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  codeInCompany: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  articleInCompany: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Companies;
