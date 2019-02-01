const router = require('express').Router();
const https = require('https');
const request = require('request');
module.exports = router;

const newPlaylist = { name: 'Moodify' };

function spotifyCreatePlaylist(body, token) {
  return new Promise((resolve, reject) => {
    let options = {
      hostname: 'api.spotify.com',
      port: 443,
      method: 'POST',
      headers: {
        Authorization: ' Bearer ' + token,
        'Content-Type': 'application/json',
      },
      path: '/v1/users/35zyxganjrgn1k7pjyh7yrf31/playlists',
      body: JSON.stringify(body),
    };
    console.log('in create', options);

    https.request(options, function(res) {
      console.log(res);
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

router.get('/', async (req, res, next) => {
  // We extract a token and query string from the query object
  let token =
    'BQBavALJegJasBGwFvwjkvhhTVutwy3OoU9p5LnMFGs6QL-Vz2wgwc2LGaEGqg7lmUH2fqTbyl-9oET8MLyQIPgp2ed7WqLnO1U5Mt8Ts8KyefKNczWbFrJ-CZKKBhrX-1_1ph9ImG7EExKr5SAU8awE-E3xHUwiMStwzPob6pPZ2PEA7pzWLjXj04T2nRit8ZXbZ_jHKxFKjKEL0QJPJIlh_C52zBok4FuSMvCUGykORw';

  console.log('playlist request passed to Spotify', newPlaylist);

  // We invoke spotifyAPI with the data we extracted:
  try {
    const data = await spotifyCreatePlaylist(newPlaylist, token);
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});
