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
    const result = await service.createOrder(req.body, req.file);
    return respond.responseSuccess(res, "Create Order successfully created", result, undefined);
  } catch (e) {
    if (e.name === errorHelper.NOT_FOUND) {
      return respond.responseNotFound(res, e.message);
    }
    logger.info(e);
    return respond.responseError(res, e.statusCode, e.message);
  }
};

module.exports = {
  createCartItem,
  index,
};
