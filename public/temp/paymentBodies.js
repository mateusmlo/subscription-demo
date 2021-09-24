import { senderBoy, holderGirl, planBuyer } from './fakeClients.js';

const paymentBodyBuilder = (
	items = {},
	sender = senderBoy,
	creditCard = holderGirl,
	shipping = {
		addressRequired: false
	},
	mode = 'DEFAULT',
	method = 'creditCard',
	currency = 'BRL',
	notificationURL = 'https://sualoja.com.br/notificacao',
	receiverEmail = 'sistemas@grupokrs.com.br',
	reference = Math.random()
) => {
	return {
		payment: {
			mode,
			method,
			sender,
			currency,
			notificationURL,
			items,
			reference,
			creditCard,
			shipping,
			receiverEmail
		}
	};
};

export const paymentBody = paymentBodyBuilder({
	item: {
		id: '1',
		description: 'HB20',
		amount: '93750.00',
		quantity: '1'
	}
});
export const createPlanBody = (
	preApproval = {
		reference: 'parangaricotirimirruaro',
		name: 'Plano Premium Plus',
		charge: 'AUTO',
		period: 'MONTHLY',
		amountPerPayment: '350.00',
		trialPeriodDuration: 14,
		expiration: {
			value: 1,
			unit: 'YEARS'
		},
		details: 'Plano avançado de assinatura'
	},
	receiver = {
		email: 'sistemas@grupokrs.com.br'
	}
) => {
	return {
		preApprovalRequest: {
			preApproval,
			receiver
		}
	};
};
