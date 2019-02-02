const router = require('express').Router();
const request = require('request');
const querystring = require('querystring');
module.exports = router;

const spotifyBaseUrl = 'https://api.spotify.com/v1/';

router.post('/', (req, res) => {
	let token = req.query.token;
	let userId, playlistUrl;

	let requestURL = spotifyBaseUrl + 'me';

	let options = {
		url: requestURL,
		headers: { Authorization: 'Bearer ' + token },
		json: true
	};

	request.get(options, function(error, response, body) {
		if (error) console.error(error);
		userId = body.id;

		// 2. Create playlist
		requestURL = spotifyBaseUrl + 'users/' + userId + '/playlists';

		options = {
			url: requestURL,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			},
			json: true,
			'Content-Type': 'json',
			body: { name: 'Moodify Tracks' }
		};

		request.post(options, function(error, response, body) {
			if (error) console.error(error);
			console.log(response.body.id);
			// res.sendStatus(200);
			res.send(response.body.id);
		});
	});
});

router.post('/add', (req, res) => {
	let token = req.query.token;
	let playlistId = req.query.playlistId;

	let requestURL = `${spotifyBaseUrl}playlists/${playlistId}/tracks`;

	let options = {
		url: requestURL,
		headers: { Authorization: 'Bearer ' + token },
		body: {
			uris: [
				'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
				'spotify:track:1301WleyT98MSxVHPZCA6M'
			]
		},
		json: true
	};

	request.post(options, function(error, response, body) {
		if (error) console.error(error);
		console.log(response.body.snapshot_id);
		res.send(response.body);
	});
});
