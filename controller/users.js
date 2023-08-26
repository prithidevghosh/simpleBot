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

module.exports.findAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json({
      users: allUsers,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching all the users." });
  }
};

module.exports.findUserById = async (req, res) => {
  try {
    const particularUser = await User.findOne({
      where: { userId: req.params.userId },
    });

    const response = particularUser
      ? { message: "User fetched successfully", userDetail: particularUser }
      : { message: "User ID is invalid" };

    return res.status(particularUser ? 200 : 500).json(response);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

module.exports.updateUserById = async (req, res) => {
  try {
    const [updatedCount] = await User.update(
      { name: req.body.name },
      { where: { userId: req.params.userId } }
    );

    const response =
      updatedCount === 1
        ? { message: "User updated successfully" }
        : { message: "User ID is invalid" };

    return res.status(updatedCount === 1 ? 200 : 500).json(response);
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

module.exports.deleteUserById = async (req, res) => {
  try {
    const deletedCount = await User.destroy({
      where: { userId: req.params.userId },
    });

    const response =
      deletedCount === 1
        ? { message: "User deleted successfully" }
        : { message: "User ID is not valid" };

    return res.status(deletedCount === 1 ? 200 : 500).json(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};
