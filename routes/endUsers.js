/**
 * Express router configuration for end user-related routes.
 * @module routes/endUsers
 */

const express = require("express");

/**
 * Express Router instance for managing end user-related routes.
 * @type {Router}
 */
const router = express.Router();

const endUsersController = require("../controller/endUsers");

/**
 * Route to create a new end user.
 * @name CreateEndUser
 * @function
 * @route {POST} /endUsers
 * @throws {Error} If an error occurs while creating the end user.
 */
router.post("/", endUsersController.createEndUser);

/**
 * Route to retrieve all end users.
 * @name RetrieveAllEndUsers
 * @function
 * @route {GET} /endUsers
 * @throws {Error} If an error occurs while retrieving end users.
 */
router.get("/", endUsersController.findAllEndUsers);

/**
 * Route to retrieve a single end user by their ID.
 * @name RetrieveSingleEndUser
 * @function
 * @route {GET} /endUsers/:endUserId
 * @param {number} :endUserId - The ID of the end user to retrieve.
 * @throws {Error} If an error occurs while retrieving the end user.
 */
router.get("/:endUserId", endUsersController.retrieveSingleEndUser);

/**
 * Route to update an end user's information by their ID.
 * @name UpdateEndUser
 * @function
 * @route {PUT} /endUsers/:endUserId
 * @param {number} :endUserId - The ID of the end user to update.
 * @throws {Error} If an error occurs while updating the end user.
 */
router.put("/:endUserId", endUsersController.updateEndUserById);

/**
 * Route to delete an end user by their ID.
 * @name DeleteEndUser
 * @function
 * @route {DELETE} /endUsers/:endUserId
 * @param {number} :endUserId - The ID of the end user to delete.
 * @throws {Error} If an error occurs while deleting the end user.
 */
router.delete("/:endUserId", endUsersController.deleteEndUserById);

module.exports = router;
