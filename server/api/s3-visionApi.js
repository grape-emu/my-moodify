// Temp code:
const AWS = require('aws-sdk');
const router = require('express').Router();
// const app = express()
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const S3_BUCKET = 'my-moodify';
const s3secrets = require('../../secrets/keys/S3secrets');
const bigConversionFunc = require('./conversionFunction.js');

module.exports = router;

// configure the keys for accessing AWS
AWS.config.update({
	accessKeyId: s3secrets.accessKeyId,
	secretAccessKey: s3secrets.secretAccessKey
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
		Key: `${name}.${type.ext}`
	};
	return s3.upload(params).promise();
};

// Defining google cloud vision api:
const vision = require('@google-cloud/vision');
const GoogleAPIKey = './secrets/keys/GoogleAPIKey.json';
const client = new vision.ImageAnnotatorClient({
	keyFilename: GoogleAPIKey
});
async function detectFaces(inputFile) {
	try {
		// Make a call to the Vision API to detect the faces
		const request = { image: { source: { imageUri: inputFile } } };
		const response = await client.faceDetection(request);
		const facialData = response[0].faceAnnotations[0];
		return facialData;
	} catch (err) {
		console.log('Cloud Vision API Error:', err);
	}
}

// Define POST route
// Integrate Google Cloud Vision API in the route
// Return facial data object

router.post('/upload', (request, response) => {
	const form = new multiparty.Form();
	form.parse(request, async (error, fields, files) => {
		if (error) throw new Error(error);
		try {
			const path = files.file[0].path;
			const buffer = fs.readFileSync(path);
			const type = fileType(buffer);
			const timestamp = Date.now().toString();
			const fileName = `bucketFolder/${timestamp}-lg`;
			const data = await uploadFile(buffer, fileName, type);
			const urlLink = data.Location;
			const facialDataObj = await detectFaces(urlLink);
			const spotifyQuery = bigConversionFunc(facialDataObj);
			const {
				joyLikelihood,
				sorrowLikelihood,
				angerLikelihood,
				surpriseLikelihood
			} = facialDataObj;

			const returnData = {
				joyLikelihood,
				sorrowLikelihood,
				angerLikelihood,
				surpriseLikelihood,
				spotifyQuery
			};
			return response.status(200).send(returnData);
		} catch (error) {
			return response.status(400).send(error);
		}
	});
});
