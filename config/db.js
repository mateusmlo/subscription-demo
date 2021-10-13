const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.PGHOST,
	username: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	database: process.env.PGDATABASE,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

try {
	sequelize.authenticate();
	console.log('✅ Succesfully connected to the database');
} catch (err) {
	console.error('Unable to connect to the database:', err);
}

exports.default = sequelize;
