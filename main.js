require('dotenv').config();

const { default: routes } = require('./routes');
const { default: db } = require('./config/db');

const express = require('express'),
	cors = require('cors'),
	{ json, urlencoded, static: expressStatic } = express;


const app = express();

app.use(expressStatic('public/pages'))
app.use(expressStatic('public'))
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(routes);

//* a database sempre inicia zerada
db.sync();


app.listen(3001, () => {
	console.log('⚡ App is listening @ http://localhost:3001');
});
