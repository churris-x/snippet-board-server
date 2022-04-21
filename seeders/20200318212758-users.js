"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../constants");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("users", [{
			name: "testuser",
			email: "test@test.com",
			password: bcrypt.hashSync("qwer", SALT_ROUNDS),
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: "dummy",
			email: "a@a.com",
			password: bcrypt.hashSync("a", SALT_ROUNDS),
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
