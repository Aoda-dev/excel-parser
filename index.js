const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');

const searchRoute = require('./routes/Search');
const filesRoute = require('./routes/Files');
const uploadRoute = require('./routes/Upload');
const companyModelsRoute = require('./routes/CompanyModels');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/search', searchRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/files', filesRoute);
app.use('/api/company', companyModelsRoute);

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server has been started at port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
