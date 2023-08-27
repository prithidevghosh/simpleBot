/**
 * Main application setup and configuration.
 * @module app
 */

const express = require("express");

/**
 * User model representing user information.
 * @typedef {import('./model/users')} User
 */
const user = require("./model/users");
const ChatBot = require("./model/chatBots");
const EndUser = require("./model/endUsers");
const Conversation = require("./model/conversations");

// Defining associations
user.hasMany(ChatBot, {
  foreignKey: "userId",
});
ChatBot.belongsTo(user, {
  foreignKey: "userId",
});

ChatBot.hasMany(Conversation, {
  foreignKey: "botId",
});
Conversation.belongsTo(ChatBot, {
  foreignKey: "botId",
});

Conversation.hasOne(EndUser, {
  foreignKey: "conversationId",
});
EndUser.belongsTo(Conversation, {
  foreignKey: "conversationId",
});

/**
 * Sequelize instance for database connection.
 * @type {import('./utils/ormConfig')}
 */
const sequelize = require("./utils/ormConfig.js");

/**
 * Express Router configuration for managing routes.
 * @type {import('./routes/index')}
 */
const routes = require("./routes/index.js");

const app = express();

// Parse JSON in request body
app.use(express.json());

// Use the defined routes
app.use("/", routes);

// Start the server
app.listen(3000, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Server started at port 3000");
});
