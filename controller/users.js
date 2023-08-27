/**
 * Controller for creating a new user.
 * @module controllers/userController
 */

const User = require("../model/users");

/**
 * Create a new user.
 * @function
 * @param {object} req - The request object containing user data in the request body.
 * @param {object} res - The response object used to send a response to the client.
 * @returns {object} - The response indicating the success of user creation and the user's name.
 */
module.exports.createUser = async (req, res) => {
  try {
    // Create a new user using the User model
    const newUser = await User.create(req.body);

    // Send a success response
    return res.status(200).json({
      message: "User created successfully",
      userName: newUser.name,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};

/**
 * Find all users in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response containing the array of all users.
 */
module.exports.findAllUsers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsPerPage = 5;

    // Calculate the offset based on the current page and itemsPerPage
    const offset = (page - 1) * itemsPerPage;

    // Find users with the specified limit and offset
    const users = await User.findAll({
      limit: itemsPerPage,
      offset: offset,
    });

    // Calculate the total number of users for pagination
    const totalCount = await User.count();

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return res.status(200).json({
      users: users,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching users." });
  }
};

/**
 * Find a user by their ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response indicating the success of user retrieval and the user's details or an error message.
 */
module.exports.findUserById = async (req, res) => {
  try {
    // Find a user by their ID in the database
    const particularUser = await User.findOne({
      where: { userId: req.params.userId },
    });

    if (!particularUser) {
      return res.status(404).json({ message: "User ID is invalid" });
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsPerPage = 5;

    // Calculate the offset based on the current page and itemsPerPage
    const offset = (page - 1) * itemsPerPage;

    // Fetch the user's details with the specified limit and offset
    const userDetail = await User.findOne({
      where: { userId: req.params.userId },
      limit: itemsPerPage,
      offset: offset,
    });

    // Calculate the total number of user details (should be 1 in this case)
    const totalCount = await User.count({
      where: { userId: req.params.userId },
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return res.status(200).json({
      message: "User fetched successfully",
      userDetail: userDetail,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

/**
 * Update a user's information by their ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response indicating the success of the update or an error message.
 */
module.exports.updateUserById = async (req, res) => {
  try {
    // Update the user's name by their ID in the database
    const [updatedCount] = await User.update(
      { name: req.body.name },
      { where: { userId: req.params.userId } }
    );

    // Prepare the response object based on whether the user was updated
    const response =
      updatedCount === 1
        ? { message: "User updated successfully" }
        : { message: "User ID is invalid" };

    // Send the appropriate response with the correct status code
    return res.status(updatedCount === 1 ? 200 : 500).json(response);
  } catch (error) {
    // Handle errors
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

/**
 * Delete a user by their ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The response indicating the success of the deletion or an error message.
 */
module.exports.deleteUserById = async (req, res) => {
  try {
    // Delete the user by their ID from the database
    const deletedCount = await User.destroy({
      where: { userId: req.params.userId },
    });

    // Prepare the response object based on whether the user was deleted
    const response =
      deletedCount === 1
        ? { message: "User deleted successfully" }
        : { message: "User ID is not valid" };

    // Send the appropriate response with the correct status code
    return res.status(deletedCount === 1 ? 200 : 500).json(response);
  } catch (error) {
    // Handle errors
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};
