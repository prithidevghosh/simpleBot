/**
 * Express router configuration for conversation-related routes.
 * @module routes/conversations
 */

const express = require("express");

/**
 * Express Router instance for managing conversation-related routes.
 * @type {Router}
 */
const router = express.Router();

const conversationController = require("../controller/conversations");

/**
 * Retrieve a single conversation by its ID.
 * @name RetrieveSingleConversation
 * @function
 * @route {GET} /conversations/:conversationId
 * @param {number} :conversationId - The ID of the conversation to retrieve.
 * @throws {Error} If an error occurs while retrieving the conversation.
 */
router.get(
  "/:conversationId",
  conversationController.retrieveSingleConversation
);

/**
 * Update a single conversation by its ID.
 * @name UpdateSingleConversation
 * @function
 * @route {PUT} /conversations/:conversationId
 * @param {number} :conversationId - The ID of the conversation to update.
 * @throws {Error} If an error occurs while updating the conversation.
 */
router.put("/:conversationId", conversationController.updateSingleConversation);

/**
 * Delete a single conversation by its ID.
 * @name DeleteSingleConversation
 * @function
 * @route {DELETE} /conversations/:conversationId
 * @param {number} :conversationId - The ID of the conversation to delete.
 * @throws {Error} If an error occurs while deleting the conversation.
 */
router.delete(
  "/:conversationId",
  conversationController.deleteSingleConversation
);

module.exports = router;
