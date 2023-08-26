const EndUser = require("../model/endUsers");

/**
 * Create a new end user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the newly created end user or error message.
 * @throws {Error} If an error occurs while creating the end user.
 */
module.exports.createEndUser = async (req, res) => {
  try {
    const newEndUser = await EndUser.create(req.body);
    return res.status(200).json({
      message: "End user created successfully",
      userDetail: newEndUser,
    });
  } catch (error) {
    console.error("Error creating end user:", error);
    return res.status(500).json({
      message: "An error occurred while creating an end user.",
    });
  }
};

/**
 * Retrieve all end users.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the list of all end users or error message.
 * @throws {Error} If an error occurs while retrieving end users.
 */
module.exports.findAllEndUsers = async (req, res) => {
  try {
    const allEndUsers = await EndUser.findAll();

    return res.status(200).json({
      message: "All end users fetched successfully",
      allUserDetail: allEndUsers,
    });
  } catch (error) {
    console.error("Error fetching end users:", error);
    return res.status(500).json({
      message: "An error occurred while fetching end users.",
    });
  }
};

/**
 * Retrieve a single end user by their ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the retrieved end user detail or error message.
 * @throws {Error} If an error occurs while retrieving the end user.
 */
module.exports.retrieveSingleEndUser = async (req, res) => {
  try {
    const singleEndUser = await EndUser.findOne({
      where: {
        endUserId: req.params.endUserId,
      },
    });

    if (singleEndUser) {
      return res.status(200).json({
        message: "End user retrieved successfully",
        userDetail: singleEndUser,
      });
    }
    return res.status(500).json({
      message: "Invalid end user ID",
    });
  } catch (error) {
    console.error("Error fetching an end user:", error);
    return res.status(500).json({
      message: "An error occurred while fetching an end user.",
    });
  }
};

/**
 * Update an end user's information by their ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the success of the update or error message.
 * @throws {Error} If an error occurs while updating the end user.
 */
module.exports.updateEndUserById = async (req, res) => {
  try {
    // Update the user's name by their ID in the database
    const [updatedCount] = await EndUser.update(
      { name: req.body.name, email: req.body.email },
      { where: { endUserId: req.params.endUserId } }
    );

    // Prepare the response object based on whether the user was updated
    const response =
      updatedCount === 1
        ? { message: "End user updated successfully" }
        : { message: "End user ID is invalid" };

    // Send the appropriate response with the correct status code
    return res.status(updatedCount === 1 ? 200 : 500).json(response);
  } catch (error) {
    // Handle errors
    console.error("Error updating end user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the end user." });
  }
};

/**
 * Delete an end user by their ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the success of deletion or error message.
 * @throws {Error} If an error occurs while deleting the end user.
 */
module.exports.deleteEndUserById = async (req, res) => {
  try {
    // Delete the user by their ID from the database
    const deletedCount = await EndUser.destroy({
      where: { endUserId: req.params.endUserId },
    });

    // Prepare the response object based on whether the user was deleted
    const response =
      deletedCount === 1
        ? { message: "End user deleted successfully" }
        : { message: "End user ID is not valid" };

    // Send the appropriate response with the correct status code
    return res.status(deletedCount === 1 ? 200 : 500).json(response);
  } catch (error) {
    // Handle errors
    console.error("Error deleting end user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the end user." });
  }
};
