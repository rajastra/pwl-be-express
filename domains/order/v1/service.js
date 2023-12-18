const repository = require("./repository");
const fileHelper = require("../../../utils/fileHelper");
const errorHelper = require("../../../utils/error");

/**
 * Get Cart by User Id
 * @param {Object} query
 */
const index = async (query) => {
  // get data cart
  return await repository.list(query);
};

/**
 * Create Cart
 * @param {Object} body
 * @param {Object} file
 */
const createOrder = async (body, file) => {
  let uploadedFile = await fileHelper.upload(file.buffer);
  body.payment = uploadedFile.secure_url;

  const item = await repository.createOrder(body);
  return {
    item: item,
  };
};

module.exports = {
  createOrder,
  index,
};
