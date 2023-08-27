/**
 * Conversation model definition and synchronization.
 * @module model/conversations
 */

const { Sequelize, DataTypes } = require("sequelize");
const EndUser = require("../model/endUsers");

/**
 * The Sequelize instance for database connection.
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite", // Replace with the actual path
});

/**
 * Conversation model representing conversation information.
 * @class Conversation
 * @extends Model
 */
const Conversation = sequelize.define(
  "conversation",
  {
    conversationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    messageContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

/**
 * Synchronize the Conversation model with the database.
 * @name SynchronizeConversationModel
 * @function
 * @async
 * @throws {Error} If an error occurs during synchronization.
 */
(async () => {
  try {
    await sequelize.sync();

    console.log("Conversation model synchronized with the database.");
  } catch (error) {
    console.error("Error synchronizing conversation model:", error);
  }
})();

module.exports = Conversation;
