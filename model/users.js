/**
 * User model definition and synchronization.
 * @module model/users
 */

const { Sequelize, DataTypes } = require("sequelize");
const ChatBot = require("../model/chatBots");

/**
 * The Sequelize instance for database connection.
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite", // Replace with the actual path
});

/**
 * User model representing user information.
 * @class User
 * @extends Model
 */
const User = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

(async () => {
  try {
    // Synchronize the User model with the database
    await sequelize.sync();

    console.log("User model synchronized with the database.");
  } catch (error) {
    console.error("Error synchronizing User model:", error);
  }
})();

module.exports = User;
