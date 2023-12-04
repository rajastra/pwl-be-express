const jwtValidation = require('../middlewares/jwtValidation');
const userApiV1 = require('../domains/user/v1/api');

const setPrivateRoutes = (app) => {
  // set middleware
  app.use(jwtValidation());

  // set routes
  app.use('/api/v1/users', userApiV1);
  // app.use('/api/v1/articles', articlePrivateApiV1);
  // app.use('/api/v1/dokter', dokterPrivateApiV1);
};

module.exports = setPrivateRoutes;
