/**
 * Sequelize database connection configuration.
 * @module config/database
 */

const { Sequelize } = require('sequelize');

/**
 * Sequelize instance for database connection.
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  host: './dev.sqlite', // Replace with the actual host or file path
  dialect: 'sqlite'
});

/**
 * Test the database connection.
 * @function
 * @memberof module:config/database
 * @inner
 */
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Test the database connection when the module is loaded
testConnection();

module.exports = sequelize;
