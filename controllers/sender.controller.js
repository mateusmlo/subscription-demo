const { default: SenderRepository } = require('../models/sender.model'),
	xmlParser = require('fast-xml-parser');
axios = require('axios');

const email = process.env.PAGSEG_EMAIL;
const token = process.env.PAGSEG_TOKEN;

const createSubscription = async (req, res) => {
	const subscriber = req.body.subscriptionBody;

	let newSubscriber = {
		name: subscriber.sender.name,
		cpf: subscriber.sender.documents[0].value,
		email: subscriber.sender.email,
		cardToken: subscriber.paymentMethod.creditCard.token,
		subscription: null,
		subscriptionStatus: true
	};

	try {
		const { data } = await axios.request({
			method: 'post',
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?email=${email}&token=${token}`,
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: subscriber
		});

		// o request acima aceita json e retorna xml 🙄
		const jsonResponse = xmlParser.parse(data);

		newSubscriber.subscription = jsonResponse.directPreApproval.code;

		await SenderRepository.create(newSubscriber);

		res.json({
			message: 'Assinatura do plano efetuada.',
			subCode: jsonResponse.directPreApproval.code
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const suspendSubscription = async (req, res) => {
	const subCode = req.body.subCode;

	if (!subCode) throw new Error('Nenhuma assinatura encontrada');

	try {
		const [sender] = await SenderRepository.findAll({
			where: { subscription: subCode }
		});

		if (sender.dataValues.subscriptionStatus === false)
			throw new Error('Assinatura já está inativa.');

		const { data } = await axios.request({
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/${subCode}/status`,
			params: {
				email: email,
				token: token
			},
			method: 'put',
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: {
				status: 'SUSPENDED'
			}
		});

		await SenderRepository.update(
			{
				subscriptionStatus: false
			},
			{ where: { subscription: subCode } }
		);

		console.log(data);
		res.json({
			message: 'Assinatura suspensa.'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

const resumeSubscription = async (req, res) => {
	const subCode = req.body.subCode;

	if (!subCode) throw new Error('Nenhuma assinatura encontrada');

	try {
		const [sender] = await SenderRepository.findAll({
			where: { subscription: subCode }
		});

		if (sender.dataValues.subscriptionStatus === true)
			throw new Error('Assinatura já está ativa.');

		const { data } = await axios.request({
			url: `https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/${subCode}/status`,
			params: {
				email: email,
				token: token
			},
			method: 'put',
			headers: {
				Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
				'Content-Type': 'application/json'
			},
			data: {
				status: 'ACTIVE'
			}
		});

		await SenderRepository.update(
			{
				subscriptionStatus: true
			},
			{ where: { subscription: subCode } }
		);

		console.log(data);
		res.json({
			message: 'Assinatura reativada.'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	createSubscription,
	suspendSubscription,
	resumeSubscription
};

/* async (req, res, next) => {
	try {
		
	} catch (err) {
		console.log('ERRO', err);
		res.status(500).json(err);
	}
}; */
