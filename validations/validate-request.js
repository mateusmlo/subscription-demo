const { validateBr } = require('js-brasil');

module.exports = (req, res, next) => {
	console.log(req.body);

	const isCpfValid = validateBr.cpf(req.body.cpf);
	const isCepValid = validateBr.cep(req.body.cep);
	const isEmailValid = validateBr.email(req.body.email);

	if (!isCpfValid || !isCepValid || !isEmailValid)
		throw new Error('Invalid document');

	next();
};
