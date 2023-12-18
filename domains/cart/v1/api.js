const express = require("express");
const controller = require("./controller");
const inputValidation = require("../../../middlewares/inputValidation");
const validation = require("./validation");

// SETUP ROUTER
const router = express.Router();

/**
 * Get List Product
 * @api public
 */
router.get("/", controller.index);

/**
 * Delete One Product
 * @api private
 */
router.delete("/:id", controller.deleteOne);

/**
 * Delete One Product
 * @api private
 */
router.post("/", controller.createCartItem);

module.exports = router;
