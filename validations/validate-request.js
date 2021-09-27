const { validateBr } = require('js-brasil');

module.exports = ({ body }, res, next) => {
	const isCpfValid = validateBr.cpf(
		body.subscriptionBody.sender.documents[0].value
	);
	const isCepValid = validateBr.cep(
		body.subscriptionBody.sender.address.postalCode
	);
	const isEmailValid = validateBr.email(body.subscriptionBody.sender.email);

	if (!isCpfValid || !isCepValid || !isEmailValid)
		return res.status(400).json('Invalid document');

	console.log('Dados válidos.');
	next();
};
