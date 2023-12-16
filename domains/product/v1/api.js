const express = require("express");
const multer = require("multer");
const inputValidation = require("../../../middlewares/inputValidation");
const controller = require("./controller");
const validation = require("./validation");

// SETUP MULTER
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// SETUP ROUTER
const router = express.Router();

/**
 * Get List Product
 * @api private
 */
router.get("/", controller.index);

/**
 * Get Detail Product
 * @api private
 */
router.get("/:id", controller.detail);

/**
 * Delete One Product
 * @api private
 */
router.delete("/:id", controller.deleteOne);

/**
 * Delete One Product
 * @api private
 */
router.post("/", upload.single("image"), controller.createProduct);

/**
 * Update Product
 * @api private
 */
router.post("/:id", upload.single("image"), inputValidation(validation.updateValidationProduct), controller.updateProduct);

module.exports = router;
