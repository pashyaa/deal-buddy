'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Stores', 'image', {
          type: Sequelize.BLOB('long'),
          allowNull: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Stores', 'image');
  }
};
