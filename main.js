require('dotenv').config();

const { default: routes } = require('./routes');
const { default: db } = require('./config/db');

const express = require('express'),
	cors = require('cors'),
	https = require('https'),
	fs = require('fs'),
	{ json, urlencoded, static: expressStatic } = express;

const key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');

const options = { key: key, cert: cert };

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(routes);

db.sync().then(() => console.log('✅ Succesfully connected to the database'));

const server = https.createServer(options, app);

server.listen(3000, () => {
	console.log('⚡ App is listening @ https://localhost:3000');
});
