import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import session from 'express-session';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
	.use(
		bodyParser.json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),

		session({
			secret: '1234567890abcdef',
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 30 * 24 * 60 * 60 * 1000
			}
		}),

		sapper.middleware({
			session: (req, res) => {
				return { account: req.session.account };
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});