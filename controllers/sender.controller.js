const { default: SenderRepository } = require('../models/sender.model');
const xmlParser = require('fast-xml-parser');

//TODO ajustar requisição que será enviada ao pagseg. XML está sendo gerado bugado, probs um problema no arquivo utils.js ao separar o array dos valores do form. Tá quase lá.
const createSubscription = async (req, res) => {
	const jsonSender = xmlParser.parse(req.body.buyPlanBody);
	console.log(jsonSender);

	/* 	const sender = {
		name: req.body.name,
		cpf: req.body.cpf,
		email: req.body.email,
		cardToken: req.body.cardToken,
		subscription: req.body.subscription,
		subscriptionStatus: req.body.subscriptionStatus
	}; */

	try {
		const createSender = await SenderRepository.create(sender);

		res.json(createSender);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const findOne = (req, res) => {};

const update = (req, res) => {};

const remove = (req, res) => {};

const findAll = (req, res) => {};

module.exports = { createSubscription };

/* async (req, res, next) => {
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
}; */
