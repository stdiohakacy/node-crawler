const express = require('express');
const router = express.Router();
const categoryRoutes = require('./category.routes');
const crawlerRoutes = require('./crawler.routes');

router.use('/categories', categoryRoutes)
router.use('/crawlers', crawlerRoutes)

module.exports = router;