const { default: SenderRepository } = require('../models/sender.model'),
	axios = require('axios');

const email = process.env.PAGSEG_EMAIL;
const token = process.env.PAGSEG_TOKEN;

const createSubscription = async (req, res) => {
	const subscriber = req.body.subscriptionBody;

	const newSubscriber = {
		name: subscriber.sender.name,
		cpf: subscriber.sender.documents[0].value,
		email: subscriber.sender.email,
		cardToken: subscriber.paymentMethod.creditCard.token,
		subscription: subscriber.reference,
		subscriptionStatus: true
	};

	try {
		const createSubscriber = await SenderRepository.create(newSubscriber);

		await axios.request({
			method: 'post',
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?email=${email}&token=${token}`,
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: subscriber
		});

		console.log('plano assinado: \n', createSubscriber);

		res.status(200).json({
			message: 'Assinatura do plano efetuada.'
		});
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
		
	} catch (err) {
		console.log('ERRO', err);
		res.status(500).json(err);
	}
}; */
