require('dotenv').config();

const { default: routes } = require('./routes');
const { default: db } = require('./config/db');

const express = require('express'),
	cors = require('cors'),
	{ json, urlencoded, static: expressStatic } = express;

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(expressStatic('public'));

app.use(routes);

db.sync({ force: true }).then(() =>
	console.log('✅ Succesfully connected to the database')
);

app.listen(3000, () => {
	console.log('⚡ App is listening @ http://localhost:3000');
});
