import { buildPaymentBody, checkEmptyInputs } from './utils.js';
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

	document.getElementById('creditCardNumber').addEventListener('input', (e) => {
		if (e.target.value.length === 6) {
			PagSeguroDirectPayment.getBrand({
				cardBin: e.target.value,
				success: function ({ brand }) {
					console.log(brand);
					e.target.classList.remove('is-danger');
					document.getElementById('cardBrand').value = brand.name;
				},
				error: function (err) {
					invalidCreditCard('Cartão de crédito inválido.');
					e.target.classList.add('is-danger');
					console.log(err);
				},
				complete: function (res) {
					console.log(res);
				}
			});
		}
	});

	//TODO dá pra melhorar -> Fazer a validação sem precisar da interação do user pra isso
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
				console.log('Token criado com sucesso', res);
				localStorage.cardToken = res.card.token;
			},
			error: (err) => {
				console.log(err);
			},
			complete: (res) => {}
		});
	});

	document.getElementById('paySub').addEventListener('click', async () => {
		const formData = Array.from(
			document.forms['CheckoutForm'].querySelectorAll('[required]')
		);

		const complements = Array.from(
			document.querySelectorAll('.addressComplement')
		).map((input) => (input.value === '' ? (input.value = '-') : input.value));

		if (checkEmptyInputs(formData)) return;

		const sender = formData.slice(0, 13).map((input, i) => {
			if (i <= 12) return input.value;

			return;
		});

		const payment = formData.slice(13).map((input) => {
			return input.value;
		});

		const paymentBody = buildPaymentBody(complements, [...sender, ...payment]);

		try {
			const { data } = await axios.request({
				url: 'http://localhost:3000/subscribe',
				method: 'post',
				data: { subscriptionBody: paymentBody }
			});

			console.log(data);
			localStorage.subCode = data.subCode;
		} catch (err) {
			console.log(err);
		}
	});
});

/*

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
