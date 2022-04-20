'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		static associate(models) {
			user.hasMany(models.post);
		}
	}
	user.init({
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'user',
	});
	return user;
};