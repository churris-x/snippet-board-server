'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("posts", "userId", {
			type: Sequelize.INTEGER,
			references: {
				model: "users",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn("posts", "userId", {});
	}
};
