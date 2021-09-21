import { checkEmptyInputs } from './utils.js';
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

	document.getElementById('senderName').addEventListener('blur', () => {
		PagSeguroDirectPayment.onSenderHashReady((res) => {
			if (res.status == 'error') {
				console.log(res.message);
				return false;
			}

			localStorage.senderHash = res.senderHash;
			console.log('Sender hash gerado!');
		});
	});

	/* document.getElementById('createPlan').addEventListener('click', async () => {
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

*/

	//TODO dá pra melhorar. Tem uma função que descobre a bandeira após 5 numeros. Fazer a validação sem precisar da interação do user pra isso
	document.getElementById('confirmCard').addEventListener('click', () => {
		const creditCardData = Array.from(
			document.getElementById('CreditCardData').querySelectorAll('[required]')
		);

		if (checkEmptyInputs(creditCardData)) return;

		PagSeguroDirectPayment.createCardToken({
			cardNumber: creditCardData[0].value, // Número do cartão de crédito
			brand: creditCardData[1].value, // Bandeira do cartão
			cvv: creditCardData[2].value, // CVV do cartão
			expirationMonth: creditCardData[3].value, // Mês da expiração do cartão
			expirationYear: creditCardData[4].value, // Ano da expiração do cartão, é necessário os 4 dígitos.
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

	document.getElementById('paySub').addEventListener('click', async () => {
		const formData = Array.from(
			document.forms['CheckoutForm'].querySelectorAll('[required]')
		);

		const complements = Array.from(
			document.querySelectorAll('.addressComplement')
		).map((input) => (input.value === '' ? (input.value = '-') : null));

		if (checkEmptyInputs(formData)) return;

		const sender = formData.slice(0, 13).map((input, i) => {
			if (i <= 12) return input.value;

			return;
		});

		const payment = formData.slice(13).map((input) => {
			return input.value;
		});

		console.log(sender, payment);

		const senderHash = localStorage.getItem('senderHash');
	});
	/* 
	const paymentXmlBody = xmlBodyParser(paymentBody);

	console.log(domParser.parseFromString(paymentXmlBody, 'text/xml'));

	try {
		const { data } = await axios.request({
			url: 'http://localhost:3000/subscribe',
			method: 'post',
			data: { buyPlanBody: planBuyer }
		});

		console.log(data);
	} catch (err) {
		console.log(err);
	} */
});

/*

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
 */
