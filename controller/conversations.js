const Conversations = require("../model/conversations");
const EndUser = require("../model/endUsers");
/**
 * Create a new conversation for an end user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the newly created conversation detail or an error message.
 * @throws {Error} If an error occurs while creating the conversation.
 */
module.exports.createConversation = async (req, res) => {
  try {
    const endUserDetail = await EndUser.findOne({
      where: {
        endUserId: req.body.endUserId,
      },
    });

    if (!endUserDetail) {
      return res.status(404).json({
        message: "End user not found",
      });
    }

    if (endUserDetail.conversationId === null) {
      const newConversation = await Conversations.create({
        messageContent: req.body.message,
        botId: req.params.chatbotId,
      });

      // Update end user's conversationId
      await EndUser.update(
        { conversationId: newConversation.conversationId },
        {
          where: {
            endUserId: req.body.endUserId,
          },
        }
      );

      return res.status(200).json({
        conversationDetail: newConversation,
      });
    } else {
      return res.status(409).json({
        message: "User is already having a conversation",
      });
    }
  } catch (error) {
    console.error("Error creating conversation:", error);
    return res.status(500).json({
      message: "An error occurred while creating the conversation.",
    });
  }
};

/**
 * Retrieve all conversations associated with a specific chatbot.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the list of conversations or an error message.
 * @throws {Error} If an error occurs while retrieving conversations.
 */
module.exports.findAllConversations = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsPerPage = 5;

    // Calculate the offset based on the current page and itemsPerPage
    const offset = (page - 1) * itemsPerPage;

    const allConversations = await Conversations.findAll({
      where: {
        botId: req.params.chatbotId,
      },
      limit: itemsPerPage,
      offset: offset,
    });

    // Calculate the total number of conversations for the specified chatbot
    const totalCount = await Conversations.count({
      where: {
        botId: req.params.chatbotId,
      },
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return res.status(200).json({
      conversations: allConversations,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return res.status(500).json({
      message: "An error occurred while fetching conversations.",
    });
  }
};

/**
 * Retrieve a single conversation by its ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the retrieved conversation detail or an error message.
 * @throws {Error} If an error occurs while retrieving the conversation.
 */
module.exports.retrieveSingleConversation = async (req, res) => {
  try {
    const singleConversation = await Conversations.findOne({
      where: {
        conversationId: req.params.conversationId,
      },
    });

    if (singleConversation) {
      return res.status(200).json({
        conversationDetail: singleConversation,
      });
    } else {
      return res.status(404).json({
        message: "Conversation not found.",
      });
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the conversation.",
    });
  }
};

/**
 * Update a single conversation by its ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the success of the update or an error message.
 * @throws {Error} If an error occurs while updating the conversation.
 */
module.exports.updateSingleConversation = async (req, res) => {
  try {
    const { message, isCompleted } = req.body;
    const updatedConversation = await Conversations.update(
      { message, isCompleted },
      {
        where: {
          conversationId: req.params.conversationId,
        },
      }
    );

    if (updatedConversation[0] === 1) {
      return res.status(200).json({
        message: "Conversation updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "Conversation not found or no changes made.",
      });
    }
  } catch (error) {
    console.error("Error updating conversation:", error);
    return res.status(500).json({
      message: "An error occurred while updating the conversation.",
    });
  }
};

/**
 * Delete a single conversation by its ID.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the success of deletion or an error message.
 * @throws {Error} If an error occurs while deleting the conversation.
 */
module.exports.deleteSingleConversation = async (req, res) => {
  try {
    const deletedConversation = await Conversations.destroy({
      where: {
        conversationId: req.params.conversationId,
      },
    });

    if (deletedConversation === 1) {
      return res.status(200).json({
        message: "Conversation deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the conversation.",
    });
  }
};
