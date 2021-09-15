import { planBuyer } from './fakeClients.js';
import { paymentBody, createPlanBody } from './paymentBodies.js';
import { XmlBodyBuilder } from './xmlBuilder.js';

const domParser = new DOMParser();
const xmlBodyParser = XmlBodyBuilder(parser);

window.addEventListener('DOMContentLoaded', async () => {
	const { data } = await axios.request({
		url: `http://localhost:3000/get-session`,
		method: 'post'
	});

	const sessionId = data.session.id;

	PagSeguroDirectPayment.setSessionId(sessionId);
	console.log('SESSION ID:    ', sessionId);

	PagSeguroDirectPayment.getBrand({
		cardBin: 411111,
		success: function (response) {
			console.log(response);
		},
		error: function (response) {
			console.log(response);
		},
		complete: function (response) {
			//tratamento comum para todas chamadas
		}
	});

	PagSeguroDirectPayment.createCardToken({
		cardNumber: '4111111111111111', // Número do cartão de crédito
		brand: 'visa', // Bandeira do cartão
		cvv: '123', // CVV do cartão
		expirationMonth: '12', // Mês da expiração do cartão
		expirationYear: '2030', // Ano da expiração do cartão, é necessário os 4 dígitos.
		success: (res) => {
			console.log(res);
			localStorage.cardToken = res.card.token;
		},
		error: (res) => {
			console.log(res);
		},
		complete: (res) => {
			console.log('Token criado com sucesso');
		}
	});
});

document.getElementById('generateHash').addEventListener('click', () => {
	PagSeguroDirectPayment.onSenderHashReady((res) => {
		if (res.status == 'error') {
			console.log(res.message);
			return false;
		}

		localStorage.senderHash = res.senderHash;
		document.getElementById('senderHash').value = res.senderHash;
		console.log('Sender hash gerado!');
	});
});

document.getElementById('sendCheckout').addEventListener('click', () => {
	paymentBody.payment.sender.hash = localStorage.getItem('senderHash');
	paymentBody.payment.creditCard.token = localStorage.getItem('cardToken');

	const paymentXmlBody = xmlBodyParser(paymentBody);

	console.log(domParser.parseFromString(paymentXmlBody, 'text/xml'));

	axios
		.request({
			url: `http://localhost:3000/transactions`,
			method: 'post',
			data: { paymentXmlBody: paymentXmlBody }
		})
		.then(({ data }) => {
			console.log(data);

			localStorage.removeItem('cardToken');
			localStorage.removeItem('senderHash');
		})
		.catch((err) => console.log(err));
});

document.getElementById('createPlan').addEventListener('click', async () => {
	const planXmlBody = xmlBodyParser(createPlanBody());

	console.log(domParser.parseFromString(planXmlBody, 'text/xml'));

	try {
		const { data } = await axios.request({
			url: 'http://localhost:3000/create-plan',
			method: 'post',
			data: { planBody: planXmlBody }
		});

		console.log(data);
	} catch (err) {
		console.log(err);
	}
});

document.getElementById('paySub').addEventListener('click', async () => {
	try {
		const { data } = await axios.request({
			url: 'http://localhost:3000/subscribe',
			method: 'post',
			data: { buyPlanBody: planBuyer }
		});

		console.log(data);
	} catch (err) {
		console.log(err);
	}
});

// valor obtido como resultado do request acima, caso cancele uma sub terá que gerar outra
const subCode = '69566C53E7E78A1334A6FFB2EA060915';

document.getElementById('suspendSub').addEventListener('click', async () => {
	try {
		await axios.request({
			url: 'http://localhost:3000/suspend-sub',
			method: 'post',
			data: {
				suspendSub: { status: 'SUSPENDED' },
				subCode: subCode
			}
		});
	} catch (err) {
		console.log(err);
	}
});

document.getElementById('reactivateSub').addEventListener('click', async () => {
	try {
		await axios.request({
			url: 'http://localhost:3000/reactivate-sub',
			method: 'post',
			data: {
				reactivateSub: { status: 'ACTIVE' },
				subCode: subCode
			}
		});
	} catch (err) {
		console.log(err);
	}
});

document.getElementById('cancelSub').addEventListener('click', async () => {
	try {
		const { data } = await axios.request({
			url: 'http://localhost:3000/cancel-sub',
			method: 'post',
			data: { subCode: subCode }
		});

		console.log(data);
	} catch (err) {
		console.log(err);
	}
});
