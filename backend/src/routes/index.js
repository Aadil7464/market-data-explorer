const express = require('express');
const router = express.Router();
const uploadRoute = require('./upload');
const metadataRoute = require('./metadata');
const filterRoute = require('./filter');

router.use('/upload', uploadRoute);
router.use('/metadata', metadataRoute);
router.use('/filter', filterRoute);

module.exports = router;