'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class post extends Model {
		static associate(models) {
			post.belongsTo(models.user);
		}
	}
	post.init({
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		syntax: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'text'
		},
	}, {
		sequelize,
		modelName: 'post',
	});
	return post;
};