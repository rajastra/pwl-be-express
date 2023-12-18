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
    return respond.responseSuccess(res, "Cart List retrieved successfully", result.data);
  } catch (e) {
    logger.info(e);
    return respond.responseError(res, e.statusCode, e.message);
  }
};

/**
 * Create Product
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const createCartItem = async (req, res) => {
  try {
    const result = await service.createCart(req.body);
    return respond.responseSuccess(res, "Cart Item successfully created", result, undefined);
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
    return respond.responseSuccess(res, "Cart Item Deleted successfully", undefined, undefined);
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
  createCartItem,
  deleteOne,
  index,
};
