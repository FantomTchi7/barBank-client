import * as api from 'api.js';

export function post(req, res) {
	const account = req.body;

	api.post('accounts', account)
		.then(response => {
			if (response && response._id) {
				req.session.account = response;
			}

			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response));
		})
		.catch(error => {
			console.error("Error proxying account creation:", error);

			res.setHeader('Content-Type', 'application/json');
			res.status(500).end(JSON.stringify({ error: error.message || 'Failed to create account.' }));
		});
}