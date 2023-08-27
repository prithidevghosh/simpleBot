const { Sequelize, DataTypes } = require("sequelize");
const Conversation = require("./conversations");
/**
 * Sequelize instance for database connection.
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite", // Replace with the actual path
});

/**
 * ChatBot model representing chatbot information.
 * @class ChatBot
 * @extends Model
 */
const ChatBot = sequelize.define(
  "chatBot",
  {
    botId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

/**
 * Synchronize the ChatBot model with the database.
 * @name SynchronizeChatBotModel
 * @function
 * @async
 * @throws {Error} If an error occurs during synchronization.
 */

(async () => {
  try {
    await sequelize.sync({ force: true });

    console.log("ChatBot model synchronized with the database.");
  } catch (error) {
    console.error("Error synchronizing ChatBot model:", error);
  }
})();

module.exports = ChatBot;
