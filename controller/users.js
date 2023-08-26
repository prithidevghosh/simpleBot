/**
 * Controller for creating a new user.
 * @module controllers/userController
 */

const User = require('../model/users');

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
      userName: newUser.name
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "An error occurred while creating the user." });
  }
};
