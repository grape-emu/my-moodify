const router = require('express').Router();
const request = require('request');
const querystring = require('querystring');
module.exports = router;

const spotifyBaseUrl = 'https://api.spotify.com/v1/';

router.post('/', (req, res) => {
  // let tracks = req.query.tracks;
  let token = req.query.token;
  let userId, playlistUrl;

  // 1. Get user ID
  let requestURL = spotifyBaseUrl + 'me';

  let options = {
    url: requestURL,
    headers: { Authorization: 'Bearer ' + token },
    json: true,
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
        'Content-Type': 'application/json',
      },
      json: true,
      'Content-Type': 'json',
      body: { name: 'Moodify Tracks' },
    };

    request.post(options, function(error, response, body) {
      if (error) console.error(error);
      res.sendStatus(200);

      //   // 3. Add tracks to playlist
      //   requestURL =
      //     playlistUrl +
      //     '/?' +
      //     querystring.stringify({
      //       uris: tracks,
      //     });

      //   options = {
      //     url: requestURL,
      //     headers: { Authorization: 'Bearer ' + token },
      //     json: true,
      //   };

      //   request.post(options, function(error, response, body) {
      //     console.log('in post', options);
      //     if (error) console.error(error);
      //     res.sendStatus(200);
      //   });
      // });
    });
  });
});

// We extract a token and query string from the query object
// let token =
//   'BQBgnKGNLUAJZpHiRVncp3ZF-UYv4aXRiuthQxERfHK5HudkBsCdo-vAr2Q-GxGyubBt54R3pEXDxNz5SnyWgD4TbioeDFJV1BJJrWevEpm9BZX_WqYmHExsWh9dcFx-d9k-kn87DIMhDQjusO58DKgBoUPIGQfyNMveKFE9r2jdD08-ATveksctgIxrFpwY7l0_f8tlj-MHMX7k4NmWntJPvJNvWwnvZaSCKkejeSm4bg';

// console.log('playlist request passed to Spotify', newPlaylist);

// We invoke spotifyAPI with the data we extracted:
// try {
//   const data = await spotifyCreatePlaylist(newPlaylist, token);
//   res.json(JSON.parse(data));
// } catch (err) {
//   next(err);
// }
