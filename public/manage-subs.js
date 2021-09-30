document.getElementById('suspendSub').addEventListener('click', async () => {
	try {
		const { data } = await axios.request({
			url: 'http://localhost:3000/suspend-sub',
			method: 'post',
			data: {
				subCode: localStorage.getItem('subCode')
			}
		});

		console.log(data);
	} catch (err) {
		console.log(err);
	}
});

document.getElementById('resumeSub').addEventListener('click', async () => {
	try {
		const { data } = await axios.request({
			url: 'http://localhost:3000/resume-sub',
			method: 'post',
			data: {
				subCode: localStorage.getItem('subCode')
			}
		});

		console.log(data);
	} catch (err) {
		console.log(err);
	}
});
