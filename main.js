import express from 'express';
import axios from 'axios';
import xmlParser from 'fast-xml-parser';

const { json, urlencoded, static: expressStatic } = express;
import cors from 'cors';

const app = express();
const email = 'sistemas@grupokrs.com.br';
const token = 'EF2A1ED8EEB446AC93263791A72FBCE5';

//TODO SETUP CORS
//? se o apache já faz o localhost, então o express...
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(expressStatic('public'));

app.post('/get-session', async (req, res, next) => {
	const { data } = await axios.request({
		url: `https://ws.sandbox.pagseguro.uol.com.br/v2/sessions`,
		method: 'post',
		params: {
			email: email,
			token: token
		}
	});

	res.status(200).json(xmlParser.parse(data));
});

app.post('/transactions', async (req, res, next) => {
	try {
		const { paymentXmlBody } = req.body;
		const { data } = await axios.request({
			url: `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=${email}&token=${token}`,
			method: 'post',
			headers: { 'Content-Type': 'application/xml;charset=ISO-8859-1' },
			data: paymentXmlBody
		});

		res.status(200).json(xmlParser.parse(data));
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

app.post('/create-plan', async (req, res, next) => {
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
});

//* esse endpoint do pagseg trabalha com JSON normalmente (por algum motivo)
app.post('/subscribe', async (req, res, next) => {
	try {
		const { buyPlanBody } = req.body;

		await axios.request({
			method: 'post',
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?email=${email}&token=${token}`,
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: buyPlanBody
		});

		console.log('plano assinado');

		res.status(200).json({ message: 'Assinatura do plano efetuada.' });
	} catch (err) {
		console.log('ERRO', err);
		res.status(500).json(err);
	}
});

//* endpoints para atualizar status da sub não retornam nada pelo pagseg
app.post('/suspend-sub', async (req, res, next) => {
	try {
		const { suspendSub, subCode } = req.body;

		await axios.request({
			method: 'put',
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/${subCode}/status`,
			params: {
				email: email,
				token: token
			},
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: suspendSub
		});

		console.log('assinatura suspensa');
		res.status(200).json({ mensagem: 'Assinatura suspensa.' });
	} catch (err) {
		console.log('ERRO', err);
		res.status(500).json(err);
	}
});

app.post('/reactivate-sub', async (req, res, next) => {
	try {
		const { reactivateSub, subCode } = req.body;

		await axios.request({
			method: 'put',
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/${subCode}/status`,
			params: {
				email: email,
				token: token
			},
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: reactivateSub
		});

		console.log('assinatura reativada');
		res.status(200).json({ mensagem: 'Assinatura reativada!' });
	} catch (err) {
		console.log('ERRO', err);
		res.status(500).json(err);
	}
});

app.post('/cancel-sub', async (req, res, next) => {
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
});

app.listen(3000, () => {
	console.log('⚡ App is listening @ http://localhost:3000');
});
