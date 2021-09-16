export const checkEmptyInputs = (formData) => {
	const emptyInput = formData.some(
			(input) =>
				input.value === '' &&
				input.id !== 'paymentComplement' &&
				input.id !== 'senderComplement'
		),
		errorElement = `<article id="errorForm" class="message is-danger">
  <div class="message-header">
    <p>Erro</p>
  </div>
  <div class="message-body">
   Obrigatório preencher todos os dados.
  </div>
</article>`;

	if (emptyInput) {
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
