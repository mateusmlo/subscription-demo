const Sequelize = require('sequelize');
const { default: db } = require('../config/db');

exports.default = db.define('sender', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cpf: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	cardToken: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	subscription: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true
	}
});
