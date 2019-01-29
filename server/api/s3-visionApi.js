// Temp code:
const AWS = require('aws-sdk');
const router = require('express').Router();
// const app = express()
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const multer = require('multer');
const S3_BUCKET = 'my-moodify';
const s3secrets = require('./keys/S3secrets');
const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
module.exports = router;

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: s3secrets.accessKeyId || AWS_ACCESS_KEY_ID,
  secretAccessKey: s3secrets.secretAccessKey || AWS_SECRET_ACCESS_KEY,
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

// Define POST route
router.post('/test-upload', (request, response) => {
  // console.log('s3secrets', s3secrets);
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      console.log('path', path);
      const buffer = fs.readFileSync(path);
      console.log('buffer', buffer);
      const type = fileType(buffer);
      console.log('type', type);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      console.log('data.location = url?', data.Location);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

// Analyze the picture
const s3Bucket = new AWS.S3({ params: { Bucket: 'my-moodify' } });
const urlParams = {
  Bucket: 'my-moodify',
  Key: 'bucketFolder/1548708223687-lg.jpg',
};
const vision = require('@google-cloud/vision');
const GoogleAPIKey = './server/api/keys/GoogleAPIKey.json';
const client = new vision.ImageAnnotatorClient({
  keyFilename: GoogleAPIKey,
});
async function detectFaces(inputFile) {
  try {
    // Make a call to the Vision API to detect the faces
    const request = { image: { source: { imageUri: inputFile } } };
    const response = await client.faceDetection(request);
    const facialData = response[0].faceAnnotations[0];
    // console.log('results[0].faceAnnotations[0]', facialData);
  } catch (err) {
    console.log('Cloud Vision API Error:', err);
  }
}

s3Bucket.getSignedUrl('getObject', urlParams, function(err, url) {
  // console.log('url', url);
  detectFaces(url);
});
