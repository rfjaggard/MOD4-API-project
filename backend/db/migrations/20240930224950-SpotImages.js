'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageId: {
        type: Sequelize.INTEGER,
        references: { model: 'SpotImages', key: 'id', onDelete: 'CASCADE' }
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: { model: 'Spots', key: 'id', onDelete: 'CASCADE' }
      },
      url: {
        type: Sequelize.TEXT
      },
      preview: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.dropTable(options);
  }
};
