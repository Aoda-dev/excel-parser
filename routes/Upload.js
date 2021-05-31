const { Router } = require('express');
const xlsx = require('node-xlsx');
const path = require('path');
const allCompanySchemes = require('../models/AllComponyScheme');
const companySchema = require('../models/CompanySchema');
const router = Router();

const keys = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const map = new Map(keys.map((key, index) => [key, index]));
keys.forEach((key, index) => {
  map.set(index.toString(), index - 1);
});

router.post('/', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const companyName = req.body.company;
  const file = req.files.file;

  const dataArr = [];

  file.mv(
    path.join(__dirname, '..', `/files/${companyName.toLowerCase()}${path.extname(file.name)}`),
    async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      const modelData = await companySchema.findAll({
        where: {
          name: companyName,
        },
      });
      const workSheetsFromFile = xlsx.parse(
        path.join(__dirname, '..', `/files/${companyName.toLowerCase()}${path.extname(file.name)}`)
      );

      workSheetsFromFile[0].data.forEach((arr, index) => {
        if (
          arr[map.get(modelData[0].description.toString().toLowerCase())] &&
          Number(arr[map.get(modelData[0].price.toString().toLowerCase())])
        ) {
          dataArr.push({
            code: modelData[0].code.toString().toLowerCase(),
            name: arr[map.get(modelData[0].description.toString().toLowerCase())],
            counts: arr[map.get(modelData[0].counts.toString().toLowerCase())],
            dillerPrice: arr[map.get(modelData[0].dillerPrice.toString().toLowerCase())],
            price: arr[map.get(modelData[0].price.toString().toLowerCase())],
            availability: arr[map.get(modelData[0].availability.toString().toLowerCase())],
            inBox: arr[map.get(modelData[0].inBox.toString().toLowerCase())],
            guarantee: arr[map.get(modelData[0].guarantee.toString().toLowerCase())],
            codeInCompany: arr[map.get(modelData[0].codeInCompany.toString().toLowerCase())],
            articleInCompany: arr[map.get(modelData[0].articleInCompany.toString().toLowerCase())],
            company: companyName,
          });
        }
      });
    }
  );

  await allCompanySchemes.destroy({
    where: {
      company: companyName.toLowerCase(),
    },
  });
  await allCompanySchemes.bulkCreate(dataArr);

  res.json('upload is working /');
});

module.exports = router;
