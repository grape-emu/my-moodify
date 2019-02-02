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
		console.log('userId', userId);

		// 2. Create playlist
		requestURL = spotifyBaseUrl + 'users/' + userId + '/playlists';
		console.log(requestURL);

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
			res.sendStatus(200);
		});
	});
});
