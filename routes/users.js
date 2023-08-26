/**
 * Express router configuration for user-related routes.
 * @module routes/users
 */

const express = require("express");

/**
 * Express Router instance for managing user-related routes.
 * @type {Router}
 */
const router = express.Router();

const userController = require("../controller/users");
const chatBotsController = require("../controller/chatBots");

/**
 * Route for creating a new user.
 * @name POST /users
 * @function
 * @memberof module:routes/users
 * @inner
 * @param {object} req - The request object containing user data in the request body.
 * @param {object} res - The response object used to send a response to the client.
 * @returns {object} - The response indicating the success of user creation and the user's name.
 */
router.post("/", userController.createUser);
router.get("/", userController.findAllUsers);
router.get("/:userId", userController.findUserById);
router.put("/:userId", userController.updateUserById);
router.delete("/:userId", userController.deleteUserById);
router.post("/:userId/chatbots", chatBotsController.createChatBot);
router.get("/:userId/chatbots", chatBotsController.findAllChatbots);

module.exports = router;
