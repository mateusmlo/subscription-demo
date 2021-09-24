/**
 * Closure que pode ser especializada para validar diferentes tipos de dados de acordo com a função de validação passada
 * @param {function} validateFunction função de validação, como alguma do jsbrasil.validateBr (que sempre retornam booleans)
 * @returns {function} validatorFunction função de validação especializada que recebe:
 * @param {string} inputData valor a ser validado
 * @param {string} errorMessage mensagem de erro caso a validação retorne false
 */
const validateInputFunction = (validateFunction) => {
	return (inputData, errorMessage) => {
		const errorElement = `<article id="errorForm" class="message is-danger">
                          <div class="message-header">
                            <p>Erro</p>
                          </div>
                          <div class="message-body">
                          ${errorMessage}
                          </div>
                        </article>`;

		if (!validateFunction(inputData)) {
			window.scrollTo({ top: 110, behavior: 'smooth' });

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
};

/**
 * Valida o valor recebido no input após o usuário clicar fora do elemento e exibe um feedback visual + mensagem em caso de valor inválido
 * @param {string} element elemento input cujo valor recebido será validado
 * @param {string} dataTypeToValidate tipo de dado a ser recebido e validado, por exemplo CPF, CEP, etc (deve estar de acordo com os métodos da lib jsbrasil)
 * @param {string} errorMessage mensagem de erro
 */
const addValidationEvent = (element, dataTypeToValidate, errorMessage) => {
	document.getElementById(element).addEventListener('blur', (e) => {
		const isInputValueInvalid = validateInputFunction(
			jsbrasil.validateBr[dataTypeToValidate]
		);

		isInputValueInvalid(e.target.value, errorMessage) === true
			? e.target.classList.add('is-danger')
			: e.target.classList.remove('is-danger');
	});
};

const invalidCreditCard = (errorMessage) => {
	const errorElement = `<article id="errorForm" class="message is-danger">
                          <div class="message-header">
                            <p>Erro</p>
                          </div>
                          <div class="message-body">
                          ${errorMessage}
                          </div>
                        </article>`;

	window.scrollTo({ top: 110, behavior: 'smooth' });

	document
		.getElementById('checkout-tile')
		.insertAdjacentHTML('afterbegin', errorElement);

	setTimeout(() => {
		document.getElementById('errorForm').remove();
	}, 3500);
};

addValidationEvent('senderMail', 'email', 'Endereço de email inválido');
addValidationEvent('senderCpf', 'cpf', 'Numero do CPF inválido');
addValidationEvent('senderCep', 'cep', 'Número do CEP inválido');
addValidationEvent('paymentCpf', 'cpf', 'Número do CPF inválido');
addValidationEvent('paymentCep', 'cep', 'Número do CEP inválido.');
