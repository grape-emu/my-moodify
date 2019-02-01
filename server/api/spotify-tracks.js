const router = require('express').Router();
const https = require('https');
module.exports = router;

function spotifyAPI(params, token) {
  return new Promise((resolve, reject) => {
    let options = {
      hostname: 'api.spotify.com',
      port: 443,
      path: '/v1/recommendations?' + params,
      method: 'GET',
      headers: {
        Authorization: ' Bearer ' + token,
      },
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
  // We extract a token and query string from the query object
  let queryObj = req.query;
  let token = req.query.token;
  // Query starts with a hardcoded genre as there is no solution for this yet:
  let newQuery = '';
  for (const property in queryObj) {
    if (queryObj.hasOwnProperty(property) && property !== 'token') {
      newQuery += `&${property}=${queryObj[property]}`;
    }
  }
  console.log('query passed to Spotify', newQuery);

  // We invoke spotifyAPI with the data we extracted:
  try {
    const data = await spotifyAPI(newQuery, token);
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});
