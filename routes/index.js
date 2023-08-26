/**
 * Express router configuration for managing routes.
 * @module routes/index
 */

const express = require('express');

/**
 * Express Router instance for managing routes.
 * @type {Router}
 */
const router = express.Router();

const users = require('./users');

// Mount the 'users' routes on the '/users' path
router.use('/users', users);

module.exports = router;
