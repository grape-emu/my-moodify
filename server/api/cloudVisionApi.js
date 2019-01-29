const router = require('express').Router();
const vision = require('@google-cloud/vision');
const GoogleAPIKey = './server/api/keys/GoogleAPIKey.json';
// const imageUrl = './client/public/guliSad.jpeg';
const imageUrl =
  'https://my-moodify.s3.amazonaws.com/bucketFolder/1548708223687-lg.jpg?AWSAccessKeyId=AKIAIXS4PWIPEK3ICL2Q&Expires=1548791725&Signature=b0H8V7ns7tLUK7t5ndhuZY%2BXa0g%3D';

// Imports the Google Cloud client library &
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: GoogleAPIKey,
});

async function detectFaces(inputFile) {
  try {
    // Make a call to the Vision API to detect the faces
    const request = { image: { source: { imageUri: inputFile } } };
    const response = await client.faceDetection(request);
    const facialData = response[0].faceAnnotations[0];
    console.log('results[0].faceAnnotations[0]', facialData);
  } catch (err) {
    console.log('Cloud Vision API Error:', err);
  }
}

detectFaces(imageUrl);

module.exports = router;
