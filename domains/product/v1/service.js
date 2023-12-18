const repository = require("./repository");
const errorHelper = require("../../../utils/error");
const fileHelper = require("../../../utils/fileHelper");
const Product = require("../product");

/**
 * Get Detail Product
 * @param {String} id
 */
const detail = async (id) => {
  const product = await repository.findById(id);
  if (!product) errorHelper.throwNotFound("Product Not Found");
  return {
    product: product,
  };
};

/**
 * Get List Product
 * @param {Object} query values for filtering needs
 */
const index = async (query) => {
  // get data
  return await repository.list(query);
};

/**
 * Delete One Product
 * @param {String} id
 */
const deleteOne = async (id) => {
  console.log(id);
  const product = await repository.findById(id);
  if (!product) errorHelper.throwNotFound("Product Not Found");

  // delete user
  let deletedProduct = await repository.deleteOne(id);
  if (!deletedProduct) errorHelper.throwInternalServerError("Delete Product Failed");

  return true;
};

/**
 * Create Product
 * @param {Object} body
 * @param {Object} file
 */
const createProduct = async (body, file) => {
  let uploadedFile = await fileHelper.upload(file.buffer);
  body.image = uploadedFile.secure_url;

  const product = await repository.save(body);

  return {
    product: product,
  };
};

/**
 * Update product
 * @param {String} id
 * @param {Object} body
 * @param {Object} file
 */
const updateProduct = async (id, body, file) => {
  const product = await repository.findById(id);
  if (!product) {
    errorHelper.throwNotFound("Product Not Found");
  }

  if (file) {
    let uploadedFile = await fileHelper.upload(file.buffer);
    body.image = uploadedFile.secure_url;
  } else if (!file && !body.image) {
    body.image = product.image;
  }

  let updatedProduct = await repository.updateOne(id, body);
  if (!updatedProduct) {
    errorHelper.throwInternalServerError("Update Product Failed");
  }
};

module.exports = {
  updateProduct,
  createProduct,
  deleteOne,
  detail,
  index,
};
