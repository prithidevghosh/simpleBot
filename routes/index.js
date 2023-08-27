/**
 * Express router configuration for managing routes.
 * @module routes/index
 */

const express = require("express");

/**
 * Express Router instance for managing routes.
 * @type {Router}
 */
const router = express.Router();

const users = require("./users");
const chatBots = require("./chatBots");
const endUsers = require("./endUsers");
const conversations = require("./conversations");

// Mount the 'users' routes on the '/users' path
router.use("/users", users);
router.use("/chatbots", chatBots);
router.use("/endusers", endUsers);
router.use("/conversations", conversations);

module.exports = router;
