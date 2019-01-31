const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./server/api'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log(`Listening on port ${port}`));
