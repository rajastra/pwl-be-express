const express = require('express');
const controller = require('./controller');

// SETUP ROUTER
const router = express.Router();

/**
 * Get List Product
 * @api public
 */
router.get('/', controller.index);

/**
 * Get Detail Product
 * @api public
 */
router.get('/:id', controller.detail);

module.exports = router;
