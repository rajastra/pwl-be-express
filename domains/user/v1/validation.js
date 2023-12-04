const joi = require('joi');
const { USER_STATUS_LIST } = require('./constant');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const update = joi.object({
  first_name: joi.string().allow('', null),
  last_name: joi.string().allow('', null),
  phone: joi.string().allow('', null),
  address: joi.string().allow('', null),
  role: joi.string().allow('', null),
  password: joiPassword
    .string()
    .minOfLowercase(5)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .minOfSpecialCharacters(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .allow('', null),
});

const updateStatus = joi.object({
  status: joi
    .string()
    .valid(...USER_STATUS_LIST)
    .required(),
});

module.exports = {
  update,
  updateStatus,
};
