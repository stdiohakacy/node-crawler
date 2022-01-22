const express = require('express');
const router = express.Router();
const crawlerRoutes = require('./crawler.routes');

router.use('/crawlers', crawlerRoutes)

module.exports = router;