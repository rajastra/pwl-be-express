const controller = require("./controller");
const express = require("express");
const multer = require("multer");

// SETUP MULTER
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

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
router.post("/", upload.single("payment"), controller.createCartItem);

module.exports = router;
