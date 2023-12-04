const express = require('express');
const cors = require('cors');
require('dotenv').config();

// import utils
const respond = require('./utils/respond');
const logger = require('./utils/logger');

// import API Routes
const setPublicRoutes = require('./routes/public');
const setPrivateRoutes = require('./routes/private');

// database connection
const sequelize = require('./utils/database');

const sync = async () =>
  await sequelize.sync({
    // force: true,
  });
sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// app
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Set Routes
setPublicRoutes(app);
setPrivateRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  logger.info('NOT FOUND!');
  respond.responseNotFound(res);
});

// error handler
app.use(function (err, req, res, next) {
  logger.info(err);
  respond.responseError(res);
});

// finalize
module.exports = app;
