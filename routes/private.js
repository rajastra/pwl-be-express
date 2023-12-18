const jwtValidation = require("../middlewares/jwtValidation");
const userApiV1 = require("../domains/user/v1/api");
const productApiV1 = require("../domains/product/v1/api");

const setPrivateRoutes = (app) => {
  // set middleware
  app.use(jwtValidation());

  // set routes
  app.use("/api/v1/users", userApiV1);
  app.use("/api/v1/product", productApiV1);
  // app.use('/api/v1/dokter', dokterPrivateApiV1);
};

module.exports = setPrivateRoutes;
