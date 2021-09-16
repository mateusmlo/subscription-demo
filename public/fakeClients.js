export const senderBoy = {
	name: 'Gustavo Márcio Felipe da Silva',
	email: 'v93662877640280812285@sandbox.pagseguro.com.br',
	phone: { areaCode: '11', number: '981536453' },
	documents: {
		document: { type: 'CPF', value: '37729253160' }
	},
	hash: localStorage.getItem('senderHash')
};

export const holderGirl = {
	token: localStorage.getItem('cardToken'),
	installment: {
		value: '93750.00',
		quantity: 1,
		noInterestInstallmentQuantity: 2
	},
	holder: {
		name: 'Patrícia Camila Liz Gomes',
		documents: {
			document: {
				type: 'CPF',
				value: '40447579339'
			},
			birthDate: '09/06/1941',
			phone: { areaCode: '11', number: '987744142' }
		}
	},
	billingAddress: {
		street: 'Rua Marginal',
		number: '538',
		complement: 'Casa 2',
		district: 'Parque Itália',
		city: 'Campinas',
		state: 'SP',
		postalCode: '13036211',
		country: 'BRA'
	}
};

// Plan é um <code> que é retornado ao criar um plano na função paymentBodies.js/createPlanBody e referencia o plano a ser assinado.
export const planBuyer = {
	plan: '94FE62572C2C682334694F9FE8F5300F',
	reference: `test${Math.random()}`,
	sender: {
		name: 'Isaac Samuel Gomes',
		email: 'isaacsamuelgomes@unilever.com',
		hash: localStorage.getItem('senderHash'),
		phone: {
			areaCode: '11',
			number: '20516250'
		},
		address: {
			street: 'Rua Vi Jose De Castro',
			number: '99',
			complement: '',
			district: 'It',
			city: 'Sao Paulo',
			state: 'SP',
			country: 'BRA',
			postalCode: '06240300'
		},
		documents: [
			{
				type: 'CPF',
				value: '00000000000'
			}
		]
	},
	paymentMethod: {
		type: 'CREDITCARD',
		creditCard: {
			token: localStorage.getItem('cardToken'),
			holder: {
				name: 'teste Teste',
				birthDate: '04/12/1991',
				documents: [
					{
						type: 'CPF',
						value: '87770392543'
					}
				],
				phone: {
					areaCode: '11',
					number: '20516250'
				},
				billingAddress: {
					street: 'Vila Lygia Fagundes Teles',
					number: '125',
					complement: '',
					district: 'Jurunas',
					city: 'Belém',
					state: 'PA',
					country: 'BRA',
					postalCode: '66030402'
				}
			}
		}
	}
};
