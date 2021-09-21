export const checkEmptyInputs = (formData) => {
	const emptyInput = formData.some((input) => input.value === ''),
		errorElement = `<article id="errorForm" class="message is-danger">
  <div class="message-header">
    <p>Erro</p>
  </div>
  <div class="message-body">
   Preencha os campos obrigatórios
  </div>
</article>`;

	if (emptyInput) {
		window.scrollTo({ top: 110, behavior: 'smooth' });

		formData.map((input) => {
			return input.value !== ''
				? input.classList.remove('is-danger')
				: input.classList.add('is-danger');
		});

		document
			.getElementById('checkout-tile')
			.insertAdjacentHTML('afterbegin', errorElement);

		setTimeout(() => {
			document.getElementById('errorForm').remove();
		}, 3500);

		return true;
	}

	return false;
};

export const buildPaymentBody = (complements, ...inputData) => {
	return {
		plan: '94FE62572C2C682334694F9FE8F5300F',
		reference: `test${Math.random()}`,
		sender: {
			name: inputData[1],
			email: inputData[0],
			hash: localStorage.getItem('senderHash'),
			phone: {
				areaCode: inputData[2],
				number: inputData[3]
			},
			address: {
				street: inputData[5],
				number: inputData[6],
				complement: complements[0],
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
};
