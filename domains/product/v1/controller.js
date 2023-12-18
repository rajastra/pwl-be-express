const errorHelper = require("../../../utils/error");
const logger = require("../../../utils/logger");
const respond = require("../../../utils/respond");
const service = require("./service");

/**
 * Get List Product
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const index = async (req, res) => {
  try {
    const result = await service.index(req.query);
    return respond.responseSuccess(res, "Prouduct List retrieved successfully", result.data, result.meta);
  } catch (e) {
    logger.info(e);
    return respond.responseError(res, e.statusCode, e.message);
  }
};

/**
 * Get Detail Product
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const detail = async (req, res) => {
  try {
    const result = await service.detail(req.params.id);
    return respond.responseSuccess(res, "Product retrieved successfully", result, undefined);
  } catch (e) {
    if (e.name === errorHelper.NOT_FOUND) {
      return respond.responseNotFound(res, e.message);
    }
    logger.info(e);
    return respond.responseError(res, e.statusCode, e.message);
  }
};

/**
 * Create Product
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const createProduct = async (req, res) => {
  try {
    const result = await service.createProduct(req.body, req.file);
    return respond.responseSuccess(res, "Product successfully created", result, undefined);
  } catch (e) {
    if (e.name === errorHelper.NOT_FOUND) {
      return respond.responseNotFound(res, e.message);
    }
    logger.info(e);
    return respond.responseError(res, e.statusCode, e.message);
  }
};

/**
 * Delete Product
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const deleteOne = async (req, res) => {
  try {
    await service.deleteOne(req.params.id);
    return respond.responseSuccess(res, "Product Deleted successfully", undefined, undefined);
  } catch (e) {
    if (e.name === errorHelper.NOT_FOUND) {
      return respond.responseNotFound(res, e.message);
    }
    if (e.name === errorHelper.BAD_REQUEST) {
      return respond.responseBadRequest(res, e.message);
    }
    if (e.name === errorHelper.UNPROCESSABLE_ENTITY) {
      return respond.responseUnprocessableEntity(res, e.message);
    }
    logger.info(e);
    return respond.responseError(res, e.statusCode, e.message);
  }
};

/**
 * Update Product
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const updateProduct = async (req, res) => {
  try {
    const result = await service.updateProduct(req.params.id, req.body, req.file);
    return respond.responseSuccess(res, "Product updated successfully", result, undefined);
  } catch (e) {
    if (e.name === errorHelper.NOT_FOUND) {
      return respond.responseNotFound(res, e.message);
    }
    if (e.name === errorHelper.BAD_REQUEST) {
      return respond.responseBadRequest(res, e.message);
    }
    if (e.name === errorHelper.UNPROCESSABLE_ENTITY) {
      return respond.responseUnprocessableEntity(res, e.message);
    }
    logger.info(e);
    return respond.responseError(res, e.statusCode, e.message);
  }
};

module.exports = {
  updateProduct,
  detail,
  createProduct,
  deleteOne,
  index,
};
