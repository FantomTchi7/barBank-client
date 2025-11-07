import * as api from 'api.js';

export function post(req, res) {
	const credentials = req.body;

	api.post('accounts/login', credentials)
		.then(response => {
			res.setHeader('Content-Type', 'application/json');

			if (response.token) {
				if (req.session) {
					req.session.account = response;
				} else {
					console.error("CRITICAL: req.session is not defined! Check your sapper.middleware in server.js");
				}
			}
			
			res.end(JSON.stringify(response));
		})
        .catch(error => {
            console.error("Error proxying login:", error);
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 500; 
			res.end(JSON.stringify({ error: 'Failed to process login request.' }));
        });
}