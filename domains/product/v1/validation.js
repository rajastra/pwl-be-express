const joi = require("joi");

const updateValidationProduct = joi.object({
  name: joi.string().allow("", null),
  price: joi.number().allow("", null),
  image: joi.string().allow("", null),
  description: joi.string().allow("", null),
  stock: joi.number().allow("", null),
  category: joi.number().allow("", null),
});

module.exports = {
  updateValidationProduct,
};
