const fs = require('fs');
const path = require('path');
const { Router } = require('express');
const router = Router();

//Получаение файлов
router.get('/', async (req, res) => {
  await fs.readdir(path.join(__dirname, '..', '/files'), (_err, result) => {
    res.json(result);
  });
});

//Удаление файлов
router.delete('/', async (req, res) => {
  console.log('delete');
});

module.exports = router;
