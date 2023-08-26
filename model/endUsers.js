/**
 * EndUser model definition and synchronization.
 * @module model/endUsers
 */

const { Sequelize, DataTypes } = require("sequelize");

/**
 * The Sequelize instance for database connection.
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite", // Replace with the actual path
});

/**
 * EndUser model representing end user information.
 * @class EndUser
 * @extends Model
 */
const EndUser = sequelize.define(
  "endUser",
  {
    endUserId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Synchronize the EndUser model with the database.
 * @name SynchronizeEndUserModel
 * @function
 * @async
 * @throws {Error} If an error occurs during synchronization.
 */
(async () => {
  try {
    await sequelize.sync();

    console.log("EndUser model synchronized with the database.");
  } catch (error) {
    console.error("Error synchronizing EndUser model:", error);
  }
})();

module.exports = EndUser;
