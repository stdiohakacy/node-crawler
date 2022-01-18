const express = require('express');
const downloadHtmlFromUrl = require('../crawlers');
const categoryController = require('../controllers/category.controller');
const router = express.Router();
const fs = require('fs');
const cheerio = require('cheerio')

router.get('/download', async (req, res) => {
    try {
        await downloadHtmlFromUrl("https://www.spapartsproshop.com/")
        
        return res.status(200).json({ isSuccess: true })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
})

router.get('/test', async (req, res) => {
    const homePageBuffer = fs.readFileSync('templates/template-1642493417352.html');
    const $ = cheerio.load(homePageBuffer);
    const category = await categoryController.getByName("Controls");
    const subCateTitle = [];
    $(".controls-sub-category.dropdown-content a").map((idx, el) => {
        subCateTitle.push({ title: $(el).text().trim(), parentId: category._id });
    })
    // const subCategories = controlSubCategoriesTitle.map(subCateTitle => ({ title: subCateTitle, parentId: category._id }))
    const result = await categoryController.bulkCreate(subCateTitle);
    console.log(result)

    return res.json({ isSuccess: true })
});

module.exports = router;