'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [      
      {
        name: 'Ely Yuniar Pertiwi',
        email: 'ellyyuniar26@gmail.com',
        password: await bcrypt.hash("1234567", 10), //setup with bcrypt encrypt
        role:"superadmin",
        createdAt: Date.now()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
