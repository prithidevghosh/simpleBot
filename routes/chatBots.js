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
const conversationController = require("../controller/conversations");

/**
 * Route to retrieve a single chatbot by its ID.
 * @name RetrieveSingleChatBot
 * @function
 * @route {GET} /users/:chatbotId
 * @param {number} :chatbotId - The ID of the chatbot to retrieve.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the chatbot detail or error message.
 * @throws {Error} If an error occurs while retrieving the chatbot.
 */
router.get("/:chatbotId", chatBotsController.retrieveSingleChatBot);

/**
 * Route to delete a single chatbot by its ID.
 * @name DeleteSingleChatBot
 * @function
 * @route {DELETE} /users/:chatbotId
 * @param {number} :chatbotId - The ID of the chatbot to delete.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the success of deletion or error message.
 * @throws {Error} If an error occurs while deleting the chatbot.
 */
router.delete("/:chatbotId", chatBotsController.deleteSingleChatBot);
router.post(
  "/:chatbotId/conversations",
  conversationController.createConversation
);
router.get(
    "/:chatbotId/conversations",
    conversationController.findAllConversations
  );
module.exports = router;
