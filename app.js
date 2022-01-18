const express = require('express');
const bodyParser = require('body-parser');
const rootRouters = require('./routes/index');
const mongoose = require('mongoose');
const fs = require('fs')
const app = express();
const cheerio = require('cheerio');

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
app.get('/crawlers', async (req, res) => {
    try {
        await downloadHtmlFromUrl("https://www.spapartsproshop.com/")
        
        return res.status(200).json({ isSuccess: true })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});


app.get('/crawlers/test', async (req, res) => {
    const homePageBuffer = fs.readFileSync('templates/template-1642493417352.html');
    const $ = cheerio.load(homePageBuffer);
    const title = $(".category-links div a").text().trim();

    return res.json({ isSuccess: true })
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});