const router = require('express').Router();
const request = require('request');
module.exports = router;

const spotifyBaseUrl = 'https://api.spotify.com/v1/';

router.post('/', (req, res) => {
	let token = req.query.token;
	let userId;

	let requestURL = spotifyBaseUrl + 'me';

	let options = {
		url: requestURL,
		headers: { Authorization: 'Bearer ' + token },
		json: true
	};

	request.get(options, function(error, response, body) {
		if (error) console.error(error);
		userId = body.id;

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
			res.send(response.body.id);
		});
	});
});

router.post('/add', (req, res) => {
	let token = req.query.token;
	let playlistId = req.query.playlistId;
	let uris = req.query.uris.split(',');

	let requestURL = `${spotifyBaseUrl}playlists/${playlistId}/tracks`;
	let options = {
		url: requestURL,
		headers: { Authorization: 'Bearer ' + token },
		body: {
			uris: uris
		},
		json: true
	};

	request.post(options, function(error, response, body) {
		if (error) console.error(error);
		res.send(response.body);
	});
});
