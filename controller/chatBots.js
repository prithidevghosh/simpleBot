/**
 * Controller functions for managing chatbots.
 * @module controller/chatBots
 */

const ChatBot = require("../model/chatBots");

/**
 * Create a new chatbot associated with a specific user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the newly created chatbot or error message.
 * @throws {Error} If an error occurs while creating the chatbot.
 */
module.exports.createChatBot = async (req, res) => {
  try {
    const newChatBot = await ChatBot.create({ userId: req.params.userId });
    return res.status(200).json({
      newBot: newChatBot,
    });
  } catch (error) {
    console.error("Error creating chatbot:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the chatbot." });
  }
};

/**
 * Retrieve all chatbots associated with a specific user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the list of chatbots or error message.
 * @throws {Error} If an error occurs while retrieving chatbots.
 */
module.exports.findAllChatbots = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsPerPage = 5;

    // Calculate the offset based on the current page and itemsPerPage
    const offset = (page - 1) * itemsPerPage;

    const chatBots = await ChatBot.findAll({
      where: {
        userId: req.params.userId,
      },
      limit: itemsPerPage,
      offset: offset,
    });

    // Calculate the total number of chatbots for the specified user
    const totalCount = await ChatBot.count({
      where: {
        userId: req.params.userId,
      },
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return res.status(200).json({
      Bots: chatBots,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error retrieving chatbots:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving chatbots.",
    });
  }
};

/**
 * Retrieve a single chatbot by its ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the chatbot detail or error message.
 * @throws {Error} If an error occurs while retrieving the chatbot.
 */
module.exports.retrieveSingleChatBot = async (req, res) => {
  try {
    const singleChatbot = await ChatBot.findOne({
      where: {
        botId: req.params.chatbotId,
      },
    });

    if (singleChatbot) {
      return res.status(200).json({
        message: "Chatbot retrieved successfully",
        chatbotDetail: singleChatbot,
      });
    } else {
      return res.status(500).json({
        message: "Invalid chatbot ID",
      });
    }
  } catch (error) {
    console.error("Error retrieving chatbot:", error);
    return res.status(500).json({
      message: "An error occurred while finding the chatbot.",
    });
  }
};

/**
 * Delete a single chatbot by its ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the success of deletion or error message.
 * @throws {Error} If an error occurs while deleting the chatbot.
 */
module.exports.deleteSingleChatBot = async (req, res) => {
  try {
    // Delete the chatbot by its ID from the database
    const deletedCount = await ChatBot.destroy({
      where: { botId: req.params.chatbotId },
    });

    // Prepare the response object based on whether the chatbot was deleted
    const response =
      deletedCount === 1
        ? { message: "Chatbot deleted successfully" }
        : { message: "Chatbot ID is not valid" };

    // Send the appropriate response with the correct status code
    return res.status(deletedCount === 1 ? 200 : 500).json(response);
  } catch (error) {
    console.error("Error deleting chatbot:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the chatbot." });
  }
};
