const authApiV1 = require('../domains/auth/v1/api');
const productPublicApiV1 = require('../domains/product/v1/apiPublic');

const setPublicRoutes = (app) => {
  app.use('/api/v1/auth', authApiV1);
  app.use('/api/v1/product', productPublicApiV1);
};

module.exports = setPublicRoutes;
