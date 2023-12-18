const joi = require("joi");

const CreateValidationCart = joi.object({
  user_id: joi.string().allow("", null),
  product_id: joi.string().allow("", null),
  quantity: joi.number().allow("", null),
  note: joi.string().allow("", null),
});

module.exports = {
  CreateValidationCart,
};
