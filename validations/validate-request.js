const { validateBr } = require('js-brasil');

module.exports = (req, res, next) => {
	console.log(req.body);
	/* 
	const isCpfValid = validateBr.cpf(req.body.cpf);
	const isCepValid = validateBr.cep(req.body.cep);
	const isEmailValid = validateBr.email(req.body.email);

	if (!isCpfValid || !isCepValid || !isEmailValid)
		return res.status(400).json('Invalid document'); */

	next();
};
