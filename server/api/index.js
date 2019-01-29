const router = require('express').Router();
module.exports = router;

router.use('/s3', require('./s3.js'));
router.use('/spotify', require('./spotify'));

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
