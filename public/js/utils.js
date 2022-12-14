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

export const buildPaymentBody = (complements, inputData) => {
	console.log(complements, inputData);

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
				district: inputData[8],
				city: inputData[9],
				state: inputData[10],
				country: 'BRA',
				postalCode: inputData[7]
			},
			documents: [
				{
					type: 'CPF',
					value: inputData[4]
				}
			]
		},
		paymentMethod: {
			type: 'CREDITCARD',
			creditCard: {
				token: localStorage.getItem('cardToken'),
				holder: {
					name: inputData[16],
					birthDate: inputData[17].split('-').reverse().join('/'),
					documents: [
						{
							type: 'CPF',
							value: inputData[18]
						}
					],
					phone: {
						areaCode: inputData[19],
						number: inputData[20]
					},
					billingAddress: {
						street: inputData[22],
						number: inputData[23],
						complement: complements[1],
						district: inputData[24],
						city: inputData[25],
						state: inputData[26],
						country: 'BRA',
						postalCode: inputData[21]
					}
				}
			}
		}
	};
};
