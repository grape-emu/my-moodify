const router = require('express').Router();
module.exports = router;
const https = require('https');
const conversionFunction = require('./conversionFunction');
const query = '?seed_genres=blues&8=0.5';

function spotifyAPI(params, token) {
	return new Promise((resolve, reject) => {
		let options = {
			hostname: 'api.spotify.com',
			port: 443,
			path: '/v1/recommendations' + params,
			method: 'GET',
			headers: {
				Authorization: ' Bearer ' + token
			}
		};

		https.get(options, res => {
			let data = '';
			res
				.on('data', chunk => {
					data += chunk;
				})
				.on('end', () => {
					resolve(data);
				})
				.on('error', err => {
					reject(err);
				});
		});
	});
}

router.get('/find', async (req, res, next) => {
	let token = req.query.token;
	//this is where the query will eventually be generated. 
	//Takes in Claire's conversion function and Guli's GoogleCloudAPI object
	//return query string, pass as query to SpotifyAPI
	console.log(conversionFunction({}));
	try {
		const data = await spotifyAPI(query, token);
		res.json(JSON.parse(data));
	} catch (err) {
		next(err);
	}
});
