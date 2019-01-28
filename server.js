const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const https = require('https');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

const functionConversion = 'seed_genres=blues&max_valence=0.5';

function spotifyAPI(params, token) {
  return new Promise((resolve, reject) => {
    let options = {
      hostname: 'api.spotify.com',
      port: 443,
      path: '/v1/' + params,
      method: 'GET',
      headers: {
        Authorization: ' Bearer ' + token,
      },
    };

    let httpsObject = https.get(options, res => {
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

app.get('/api/spotify/find', async (req, res, next) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));
