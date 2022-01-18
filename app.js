const express = require('express');
const bodyParser = require('body-parser');
const rootRouters = require('./routes/index');
const mongoose = require('mongoose');
const fs = require('fs')
const app = express();

// Configuring the database
const dbConfig = require('./config/database.config');
const downloadHtmlFromUrl = require('./crawlers');
const createSeedData = require('./initial');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(async () => {
    console.log("Successfully connected to the database");    
    await createSeedData();
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', rootRouters)

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
