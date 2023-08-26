/**
 * Main application setup and configuration.
 * @module app
 */

const express = require("express");

/**
 * User model representing user information.
 * @type {import('./model/users')}
 */
const user = require("./model/users");
const ChatBot = require("./model/chatBots");

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
