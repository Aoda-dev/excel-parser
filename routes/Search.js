const { Router } = require('express');
const router = Router();
const Sequelize = require('../utils/database');
const AllCompanySchema = require('../models/AllComponyScheme');

router.get('/', async (req, res) => {
  try {
    const data = await AllCompanySchema.findAll();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
