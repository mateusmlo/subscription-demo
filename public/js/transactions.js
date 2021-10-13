const DateTime = luxon.DateTime;

document
	.getElementById('retrieveSubHistory')
	.addEventListener('click', async () => {
		try {
			const { data } = await axios.request({
				url: `https://localhost:3000/sub-history?subCode=${localStorage.getItem(
					'subCode'
				)}`,
				method: 'get'
			});

			createPaymentRows(formatPaymentOrdersData(data));
		} catch (err) {
			console.log(err);
		}
	});

const formatPaymentOrdersData = ({ paymentOrders }) => {
	console.log(paymentOrders);
	const orderCodes = Object.keys(paymentOrders);

	const orders = orderCodes
		.map((code) => {
			if (paymentOrders[code].status === 5) return paymentOrders[code];

			return;
		})
		.filter((value) => value !== undefined);

	return orders;
};

const createPaymentRows = (paymentData) => {
	const table = document.getElementById('transactionsTable');
	if (table.rows.length >= 1) resetTable(table);

	paymentData.map((payment, i) => {
		const row = table.insertRow(i),
			paymentCodeCell = row.insertCell(0),
			dateCell = row.insertCell(1),
			valueCell = row.insertCell(2);

		paymentCodeCell.innerHTML = payment.code;
		dateCell.innerHTML = DateTime.fromISO(payment.lastEventDate)
			.setLocale('pt-BR')
			.toFormat('D');
		valueCell.innerHTML = payment.amount;
	});

	return table;
};

const resetTable = (table) => {
	Array.from(table.rows).map((row) => table.removeChild(row));
};
