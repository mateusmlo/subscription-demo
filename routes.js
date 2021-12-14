const express = require('express'),
	axios = require('axios'),
	xmlParser = require('fast-xml-parser'),
	{
		createSubscription,
		suspendSubscription,
		resumeSubscription,
		subscriptionsHistory
	} = require('./controllers/sender.controller'),
	validateRequest = require('./validations/validate-request');

const email = process.env.PAGSEG_EMAIL;
const token = process.env.PAGSEG_TOKEN;

const routes = express.Router();

routes.post('/get-session', async (req, res) => {
	try {
		const { data } = await axios.request({
			url: `http://ws.sandbox.pagseguro.uol.com.br/v2/sessions`,
			method: 'post',
			params: {
				email: email,
				token: token
			}
		});

		res.status(200).json(xmlParser.parse(data));
	} catch (err) {
		console.log(err.response);
		res.status(500).json({ error: err.message });
	}
});

routes.post('/subscribe', validateRequest, createSubscription);

//* endpoints para atualizar status da sub não retornam nada pelo pagseg
routes.post('/suspend-sub', suspendSubscription);

routes.post('/resume-sub', resumeSubscription);

routes.get('/sub-history', subscriptionsHistory);

/* routes.post('/cancel-sub', async (req, res, next) => {
	try {
		const { subCode } = req.body;

		await axios.request({
			method: 'put',
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/${subCode}/cancel`,
			params: {
				email: email,
				token: token
			},
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: ''
		});

		console.log('assinatura cancelada');
		res.status(200).json({ mensagem: 'F Assinatura' });
	} catch (err) {
		console.log('ERRO', err);
		res.status(500).json(err);
	}
}); */

/* routes.post('/create-plan', async (req, res, next) => {
	try {
		const { planBody } = req.body;

		const config = {
			method: 'post',
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/request/?email=${email}&token=${token}`,
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/xml;charset=ISO-8859-1'
			},
			data: planBody
		};

		const { data } = await axios(config);

		console.log(JSON.stringify(data));

		res.status(200).json(xmlParser.parse(data));
	} catch (err) {
		console.log('ERRO', err);
		res.status(500).json(err);
	}
}); */

exports.default = routes;
