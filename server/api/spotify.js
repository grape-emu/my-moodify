const router = require('express').Router();
module.exports = router;

const https = require('https');

const functionConversion = 'seed_genres=blues&max_valence=0.5';

// function converting from google to spotify will have to convert to string before output: key=value.join('&')
// will be importing output of function here (likewise ../../client/components/Recommendations)

//JEFF SUGGESTED NEW NAME FOR SPOTIFY API FUNCTION
//pass querystring, token

//to make a post request, call spotifyAPI(params, 'POST', token, 'pl)
/* when making a post request
let postData = JSON.stringify({name: 'boring playlist', description: 'your new boring album', public: true})


headers: {
   'Content-Type': 'application/json.',
   'Content-Length': Buffer.byteLength(postData)
}

*/
function spotifyAPI(params, method, token) {
	let options = {
		hostname: 'api.spotify.com',
		path: '/v1/' + params,
		method: '',
		headers: {
			Authorization: ' Bearer ' + token
		}
	};

	switch (method) {
		case 'GET':
		case 'POST':
			options.method = method;
			break;
		default:
		//throw error
	}

  //resolve and reject are built-in callback functions
	return new Promise((resolve, reject) => {
		https.request(options, function(res) {
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
	try {
		const data = await spotifyAPI(
			`recommendations?${functionConversion}`,
			token
		);
		res.json(JSON.parse(data));
	} catch (err) {
		next(err);
	}
});
