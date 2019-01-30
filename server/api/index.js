const router = require('express').Router();
module.exports = router;

router.use('/s3', require('./s3-visionApi.js'));
router.use('/spotify', require('./spotify-tracks'));
// router.use('/spotify', require('./spotify-playlist'));
router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
