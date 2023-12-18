const repository = require("./repository");
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
 * Delete One Cart Item
 * @param {String} id
 */
const deleteOne = async (id) => {
  const item = await repository.findById(id);
  if (!item) errorHelper.throwNotFound("Item Not Found");

  // delete Item
  let deletedItem = await repository.deleteOne(id);
  if (!deletedItem) errorHelper.throwInternalServerError("Delete Cart Item Failed");

  return true;
};

/**
 * Create Cart
 * @param {Object} body
 */
const createCart = async (body) => {
  const item = await repository.save(body);

  return {
    item: item,
  };
};

module.exports = {
  createCart,
  deleteOne,
  index,
};
