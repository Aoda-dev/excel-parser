const path = require('path');
const fs = require('fs');
const { Router } = require('express');
const router = Router();
const allCompanySchemes = require('../models/AllComponyScheme');
const schemaCompany = require('../models/CompanySchema');

//Получить список компаний
router.get('/', async (req, res) => {
  try {
    const models = await schemaCompany.findAll();
    res.json(models);
  } catch (error) {
    console.log(error);
  }
});

//Создать компанию
router.post('/', async (req, res) => {
  try {
    const model = await schemaCompany.findAll({
      where: {
        id: req.body.data.id,
      },
    });

    if (model[0]?.name) {
      (model[0].code = req.body.data.code),
        (model[0].name = req.body.data.name),
        (model[0].description = req.body.data.description),
        (model[0].counts = req.body.data.counts),
        (model[0].dillerPrice = req.body.data.dillerPrice),
        (model[0].price = req.body.data.price),
        (model[0].availability = req.body.data.availability),
        (model[0].inBox = req.body.data.inBox),
        (model[0].guarantee = req.body.data.guarantee),
        (model[0].codeInCompany = req.body.data.codeInCompany),
        (model[0].articleInCompany = req.body.data.articleInCompany),
        await model[0].save();
    } else {
      await schemaCompany.create({
        code: req.body.data.code,
        name: req.body.data.name,
        description: req.body.data.description,
        counts: req.body.data.counts,
        dillerPrice: req.body.data.dillerPrice,
        price: req.body.data.price,
        availability: req.body.data.availability,
        inBox: req.body.data.inBox,
        guarantee: req.body.data.guarantee,
        codeInCompany: req.body.data.codeInCompany,
        articleInCompany: req.body.data.articleInCompany,
      });
    }
  } catch (error) {
    console.log(error);
  }
  res.json('succses');
});

router.delete('/:id', async (req, res) => {
  try {
    const model = await schemaCompany.findAll({
      where: {
        id: +req.params.id,
      },
    });

    await allCompanySchemes.destroy({
      where: {
        company: model[0].name.toLowerCase(),
      },
    });
    await model[0].destroy();

    await fs.readdir(path.join(__dirname, '..', `/files`), async (err, result) => {
      if (err) console.log(err);
      const fileName = result.filter((n) => n.includes(model[0].name.toString().toLowerCase()));

      await fs.unlink(path.join(__dirname, '..', `/files/${fileName}`), (err) => {
        console.log(err);
      });
    });

    res.status(204).json({});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
